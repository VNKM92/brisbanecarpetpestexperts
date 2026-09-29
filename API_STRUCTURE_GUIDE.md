# 🔗 API & Backend Structure Guide

## Overview

Your Next.js application has a complete, production-ready backend API structure with the App Router.

---

## 📁 API Routes Structure

```
src/app/api/
├── services/
│   ├── route.ts                 ✅ GET all services
│   └── [id]/
│       └── route.ts             (GET/PUT/DELETE specific service)
├── contact/
│   └── route.ts                 ✅ POST contact form
├── blog/
│   ├── route.ts                 (GET all blog posts)
│   └── [slug]/
│       └── route.ts             (GET specific post)
├── pricing/
│   └── route.ts                 (GET pricing plans)
├── testimonials/
│   └── route.ts                 (GET testimonials)
└── auth/
    ├── login/
    │   └── route.ts             (POST login)
    ├── register/
    │   └── route.ts             (POST register)
    └── logout/
        └── route.ts             (POST logout)
```

---

## 🔧 API Route Patterns

### Pattern 1: Simple GET Endpoint

```typescript
// src/app/api/services/route.ts
import { successResponse, apiHandler } from '@/lib/api-handlers';

export const GET = apiHandler(async (request) => {
  const services = [
    { id: '1', name: 'Service 1', price: 99 },
    { id: '2', name: 'Service 2', price: 199 },
  ];
  
  return successResponse(services, 'Services retrieved successfully');
});
```

### Pattern 2: POST with Validation

```typescript
// src/app/api/contact/route.ts
import { apiHandler, validationError } from '@/lib/api-handlers';
import { validateData } from '@/lib/validation';
import { contactFormSchema } from '@/lib/validation';

export const POST = apiHandler(async (request) => {
  const body = await request.json();
  
  const validation = await validateData(contactFormSchema, body);
  if (!validation.success) {
    return validationError(validation.errors);
  }
  
  // Process the data
  console.log('Contact:', validation.data);
  
  return successResponse(
    { id: Date.now() },
    'Contact submitted successfully',
    201
  );
});
```

### Pattern 3: GET with ID Parameter

```typescript
// src/app/api/services/[id]/route.ts
import { notFound, successResponse, apiHandler } from '@/lib/api-handlers';

export const GET = apiHandler(async (request, { params }) => {
  const { id } = params;
  
  const service = { id, name: 'Service Name', price: 99 };
  
  if (!service) {
    return notFound('Service not found');
  }
  
  return successResponse(service);
});

export const PUT = apiHandler(async (request, { params }) => {
  const { id } = params;
  const body = await request.json();
  
  // Update service
  const updated = { id, ...body };
  
  return successResponse(updated, 'Service updated successfully');
});

export const DELETE = apiHandler(async (request, { params }) => {
  const { id } = params;
  
  // Delete service
  
  return successResponse({ deleted: true }, 'Service deleted successfully');
});
```

### Pattern 4: With CORS Support

```typescript
// src/app/api/data/route.ts
import { apiHandler, handleCors } from '@/lib/api-handlers';
import { successResponse } from '@/lib/api-handlers';

export const GET = apiHandler(async (request) => {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;
  
  const data = { message: 'Hello from API' };
  return successResponse(data);
});

export const OPTIONS = async (request) => {
  return handleCors(request) || new Response(null, { status: 200 });
};
```

### Pattern 5: With Authentication

```typescript
// src/app/api/protected/route.ts
import { 
  apiHandler, 
  successResponse, 
  unauthorized,
  getBearerToken 
} from '@/lib/api-handlers';

export const GET = apiHandler(async (request) => {
  const token = getBearerToken(request);
  
  if (!token) {
    return unauthorized('No authorization token provided');
  }
  
  // Verify token here
  // const user = verifyToken(token);
  
  return successResponse({ message: 'Authorized' });
});
```

### Pattern 6: File Upload

```typescript
// src/app/api/upload/route.ts
import { apiHandler, successResponse, errorResponse } from '@/lib/api-handlers';

export const POST = apiHandler(async (request) => {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return errorResponse({ status: 400, message: 'No file provided' });
  }
  
  // Process file
  const buffer = await file.arrayBuffer();
  
  return successResponse({ filename: file.name }, 'File uploaded', 201);
});
```

---

## 🎯 Response Patterns

### Success Response
```typescript
// Returns: { success: true, data: {...}, message: '...', timestamp: '...' }
return successResponse(data, 'Success message', 200);
```

### Error Response
```typescript
// Returns: { success: false, error: '...', timestamp: '...' }
return errorResponse({
  status: 500,
  message: 'Something went wrong'
});
```

### Validation Error
```typescript
// Returns: { success: false, error: '...', errors: {...}, timestamp: '...' }
return validationError({ field: 'Error message' });
```

### Not Found
```typescript
// Returns: { success: false, error: 'Resource not found' }
return notFound('Resource not found');
```

### Unauthorized
```typescript
// Returns: { success: false, error: 'Unauthorized' }
return unauthorized();
```

### Forbidden
```typescript
// Returns: { success: false, error: 'Forbidden' }
return forbidden();
```

---

## 📝 Validation Schemas

Pre-built schemas in `src/lib/validation.ts`:

```typescript
// Contact Form
import { contactFormSchema } from '@/lib/validation';

// Service Request
import { serviceRequestSchema } from '@/lib/validation';

// Login
import { loginSchema } from '@/lib/validation';

// Register
import { registerSchema } from '@/lib/validation';
```

Create custom schemas:

```typescript
import { z } from 'zod';

export const mySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18),
});

export type MyData = z.infer<typeof mySchema>;
```

---

## 🔌 Using API from Frontend

### With useFetch Hook
```typescript
import { useFetch } from '@/hooks';

function MyComponent() {
  const { data, loading, error, fetch } = useFetch('/api/services');
  
  useEffect(() => {
    fetch();
  }, [fetch]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data?.map(s => <div key={s.id}>{s.name}</div>)}</div>;
}
```

### With usePost Hook
```typescript
import { usePost } from '@/hooks';

function MyForm() {
  const { post, loading, error } = usePost();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post('/api/contact', {
        name: 'John',
        email: 'john@example.com'
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Direct API Client
```typescript
import { apiClient } from '@/lib/api-client';

// GET
const data = await apiClient.get('/api/services');

// POST
const response = await apiClient.post('/api/contact', {
  name: 'John',
  email: 'john@example.com'
});

// PUT
const updated = await apiClient.put('/api/services/1', {
  name: 'Updated Service'
});

// DELETE
await apiClient.delete('/api/services/1');
```

---

## 🔐 Security Considerations

### CORS Configuration
```typescript
import { handleCors } from '@/lib/middleware';

export const GET = apiHandler(async (request) => {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;
  
  // Your logic
});
```

### Rate Limiting
```typescript
import { isRateLimited, getClientIP } from '@/lib/middleware';

export const POST = apiHandler(async (request) => {
  const ip = getClientIP(request);
  
  if (isRateLimited(ip, 10, 60000)) { // 10 requests per minute
    return errorResponse({ status: 429, message: 'Too many requests' });
  }
  
  // Your logic
});
```

### Bearer Token Validation
```typescript
import { getBearerToken } from '@/lib/api-handlers';

export const GET = apiHandler(async (request) => {
  const token = getBearerToken(request);
  
  if (!token || !isValidToken(token)) {
    return unauthorized();
  }
  
  // Your logic
});
```

---

## 📊 Common API Endpoints Template

```typescript
// src/app/api/[resource]/route.ts
import { apiHandler, successResponse, errorResponse, validationError } from '@/lib/api-handlers';

// GET all items
export const GET = apiHandler(async (request) => {
  try {
    const items = []; // Fetch from database
    return successResponse(items, 'Items retrieved');
  } catch (error) {
    return errorResponse({ status: 500, message: 'Failed to fetch items' });
  }
});

// POST create new item
export const POST = apiHandler(async (request) => {
  try {
    const body = await request.json();
    
    // Validate
    // const validation = await validateData(schema, body);
    // if (!validation.success) return validationError(validation.errors);
    
    // Create
    // const item = await db.create(body);
    
    return successResponse(body, 'Item created', 201);
  } catch (error) {
    return errorResponse({ status: 500, message: 'Failed to create item' });
  }
});
```

---

## 🚀 Advanced Patterns

### Pagination
```typescript
export const GET = apiHandler(async (request) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  
  const items = []; // Get paginated items
  const total = 100;
  
  return successResponse({
    data: items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  });
});
```

### Filtering
```typescript
export const GET = apiHandler(async (request) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const search = url.searchParams.get('search');
  
  // Filter items based on category and search
  const items = [];
  
  return successResponse(items);
});
```

### Caching
```typescript
export const GET = apiHandler(async (request) => {
  // Add cache headers
  const response = successResponse(data);
  
  response.headers.set(
    'Cache-Control',
    'public, max-age=3600' // 1 hour
  );
  
  return response;
});
```

---

## 📚 Type Definitions

Available types in `src/types/index.ts`:

```typescript
import {
  ApiResponse,
  PaginatedResponse,
  Service,
  BlogPost,
  Testimonial,
  PricingPlan,
  User,
  Booking,
  ContactMessage
} from '@/types';
```

---

## ✨ Best Practices

✅ Always use `apiHandler` wrapper for error handling
✅ Validate input with Zod schemas
✅ Return appropriate HTTP status codes
✅ Include clear error messages
✅ Handle CORS when needed
✅ Implement rate limiting
✅ Use TypeScript for type safety
✅ Add request logging
✅ Implement authentication
✅ Document endpoints with JSDoc

---

## 🔗 Related Files

- API Handlers: `src/lib/api-handlers.ts`
- Middleware: `src/lib/middleware.ts`
- Validation: `src/lib/validation.ts`
- Types: `src/types/index.ts`
- API Client: `src/lib/api-client.ts`

---

**Ready to build APIs!** 🚀
