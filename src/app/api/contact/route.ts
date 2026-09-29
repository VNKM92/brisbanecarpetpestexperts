import { NextRequest } from 'next/server';
import { successResponse, errorResponse, apiHandler } from '@/lib/api-handlers';
import { contactFormSchema } from '@/lib/validation';
import { handleCors } from '@/lib/middleware';

export const POST = apiHandler(async (request: NextRequest) => {
  // Handle CORS
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  const body = await request.json();

  // Validate contact form data
  const validation = contactFormSchema.safeParse(body);
  
  if (!validation.success) {
    return errorResponse({
      status: 422,
      message: 'Validation failed',
      errors: validation.error.flatten().fieldErrors as Record<string, string>,
    });
  }

  // TODO: Save to database or send email
  console.log('Contact message:', validation.data);

  return successResponse(
    { id: Date.now().toString() },
    'Message sent successfully',
    201
  );
});

export async function OPTIONS(request: NextRequest) {
  return handleCors(request) || new Response(null, { status: 200 });
}
