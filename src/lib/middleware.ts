import { NextResponse, NextRequest } from 'next/server';

/**
 * Enable CORS for API routes
 */
export function corsHeaders(origin?: string) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Handle CORS preflight requests
 */
export function handleCors(request: NextRequest): NextResponse | null {
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders(request.headers.get('origin') || undefined),
    });
  }
  return null;
}

/**
 * Rate limiting helper
 */
const requestLimits = new Map<string, { count: number; resetTime: number }>();

export function isRateLimited(
  identifier: string,
  limit: number = 100,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const existing = requestLimits.get(identifier);

  if (!existing || now > existing.resetTime) {
    requestLimits.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return false;
  }

  if (existing.count >= limit) {
    return true;
  }

  existing.count++;
  return false;
}

/**
 * Get client IP
 */
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}
