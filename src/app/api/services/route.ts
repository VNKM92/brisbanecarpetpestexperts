import { NextRequest } from 'next/server';
import { successResponse, apiHandler, handleCors } from '@/lib/api-handlers';

export const GET = apiHandler(async (request: NextRequest) => {
  // Handle CORS
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  // Example endpoint - replace with actual data
  const services = [
    {
      id: '1',
      name: 'Residential Cleaning',
      description: 'Professional cleaning for your home',
      category: 'Residential',
      price: 99,
      duration: '2-3 hours',
    },
    {
      id: '2',
      name: 'Commercial Cleaning',
      description: 'Cleaning solutions for businesses',
      category: 'Commercial',
      price: 199,
      duration: '4-5 hours',
    },
  ];

  return successResponse(services, 'Services retrieved successfully');
});
