import { NextRequest, NextResponse } from 'next/server';

// ----------------------------------------------------
// 1. IN-MEMORY RATE LIMITER
// ----------------------------------------------------

interface RateLimitStore {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitStore>();

/**
 * Basic in-memory rate limiter per IP address
 * @param req NextRequest
 * @param limit Max requests per window
 * @param windowMs Window in milliseconds
 */
export function checkRateLimit(
  req: NextRequest,
  limit = 20,
  windowMs = 60 * 1000
): { allowed: boolean; remaining: number } {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  const key = `${ip}_${req.nextUrl.pathname}`;
  const now = Date.now();

  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}

// ----------------------------------------------------
// 2. INPUT SANITIZATION & VALIDATION
// ----------------------------------------------------

export function sanitizeString(input?: string | null): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Strip < and > to prevent basic HTML/script injection
    .trim();
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Allow international/AU formats, spaces, dashes, +, brackets
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phone.replace(/\s+/g, '').length >= 8;
}

// ----------------------------------------------------
// 3. FILE UPLOAD VALIDATION
// ----------------------------------------------------

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'application/pdf',
];

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export function validateUploadFile(file: { name: string; type: string; size: number }): {
  valid: boolean;
  error?: string;
} {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported file type (${file.type}). Allowed: JPG, PNG, WEBP, SVG, GIF, PDF.`,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: 'File size exceeds maximum permitted limit of 5MB.',
    };
  }

  return { valid: true };
}

// ----------------------------------------------------
// 4. CLIENT IP & USER AGENT EXTRACTION
// ----------------------------------------------------

export function getClientInfo(req: NextRequest) {
  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'Unknown Agent';
  return { ipAddress, userAgent };
}
