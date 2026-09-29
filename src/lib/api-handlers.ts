import { NextResponse, NextRequest } from 'next/server';

export interface ApiErrorOptions {
  status?: number;
  message?: string;
  errors?: Record<string, string>;
}

/**
 * Send success response
 */
export function successResponse<T>(
  data: T,
  message: string = 'Success',
  status: number = 200
): NextResponse<any> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Send error response
 */
export function errorResponse(
  options: ApiErrorOptions = {}
): NextResponse<any> {
  const {
    status = 500,
    message = 'Internal Server Error',
    errors = {},
  } = options;

  return NextResponse.json(
    {
      success: false,
      error: message,
      errors,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Handle validation errors
 */
export function validationError(
  errors: Record<string, string>
): NextResponse<any> {
  return errorResponse({
    status: 422,
    message: 'Validation failed',
    errors,
  });
}

/**
 * Handle not found
 */
export function notFound(message: string = 'Resource not found'): NextResponse<any> {
  return errorResponse({
    status: 404,
    message,
  });
}

/**
 * Handle unauthorized
 */
export function unauthorized(message: string = 'Unauthorized'): NextResponse<any> {
  return errorResponse({
    status: 401,
    message,
  });
}

/**
 * Handle forbidden
 */
export function forbidden(message: string = 'Forbidden'): NextResponse<any> {
  return errorResponse({
    status: 403,
    message,
  });
}

/**
 * Wrap async API route handlers with error handling
 */
export function apiHandler(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error('[API Error]', error);
      return errorResponse({
        status: 500,
        message: error instanceof Error ? error.message : 'Internal Server Error',
      });
    }
  };
}

/**
 * Check if request is authorized (add token validation as needed)
 */
export function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  // Implement your authorization logic here
  return !!authHeader;
}

/**
 * Get bearer token from request
 */
export function getBearerToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}

/**
 * Parse request body safely
 */
export async function safeParseJSON<T>(request: NextRequest): Promise<T | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

/**
 * Handle CORS for API routes
 */
export function handleCors(request: NextRequest): NextResponse<any> | null {
  const origin = request.headers.get('origin') || '*';
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  return null;
}
