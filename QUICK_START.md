# 🎯 Quick Start Guide

## ⚡ Getting Started in 30 Seconds

### 1️⃣ Start Dev Server
```bash
npm run dev
```
✅ **Open**: http://localhost:3000

### 2️⃣ Create First Page
```bash
# Create folder
mkdir -p src/app/\(frontend\)/my-page

# Create page.tsx with SEO
# src/app/(frontend)/my-page/page.tsx
```

```typescript
import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata(
  'My Page Title',
  'Page description',
  '/my-page'
);

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">Welcome</h1>
    </main>
  );
}
```

### 3️⃣ Create API Endpoint
```bash
# Create folder
mkdir -p src/app/api/my-endpoint
```

```typescript
// src/app/api/my-endpoint/route.ts
import { successResponse, apiHandler } from '@/lib/api-handlers';

export const GET = apiHandler(async (req) => {
  return successResponse({ message: 'Hello!' });
});

export const POST = apiHandler(async (req) => {
  const data = await req.json();
  // Process data...
  return successResponse(data, 'Success', 201);
});
```

### 4️⃣ Use API in Component
```typescript
import { useFetch } from '@/hooks';

function MyComponent() {
  const { data, loading, error } = useFetch('/api/my-endpoint');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}
```

## 📋 File Locations Cheat Sheet

| What | Where |
|------|-------|
| **Pages** | `src/app/(frontend)/page-name/page.tsx` |
| **API Routes** | `src/app/api/endpoint/route.ts` |
| **Components** | `src/components/[category]/Component.tsx` |
| **Hooks** | `src/hooks/useName.ts` |
| **Types** | `src/types/index.ts` |
| **Config** | `src/config/*.ts` |
| **Utils** | `src/lib/*.ts` |
| **Validation** | `src/lib/validation.ts` |
| **SEO Config** | `src/config/seo.ts` |

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build            # Build for production
npm start                # Start production server

# Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript

# Dependencies
npm install              # Install packages
npm update               # Update packages
```

## 🎨 Using Components

```typescript
import { Button, Card, Input } from '@/components';

export default function Page() {
  return (
    <Card>
      <h1>Title</h1>
      <Input placeholder="Enter name" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## 🔐 Form Validation Example

```typescript
import { useForm } from '@/hooks';
import { contactFormSchema } from '@/lib/validation';

export default function ContactForm() {
  const { values, errors, handleChange, handleSubmit, loading } = useForm({
    initialValues: { name: '', email: '', message: '' },
    onSubmit: async (data) => {
      await apiClient.post('/api/contact', data);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      {errors.name && <span>{errors.name}</span>}
      
      <button disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
```

## 🌐 SEO Meta Tags

```typescript
import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata(
  'Page Title',
  'Page description for search engines',
  '/page-path',
  '/images/og-image.jpg',
  'article' // or 'website'
);
```

## 🗄️ API Response Patterns

### Success Response
```typescript
return successResponse(data, 'Success message', 200);
```

### Error Response
```typescript
return errorResponse({ status: 400, message: 'Bad request' });
```

### Validation Error
```typescript
return validationError({ field: 'Error message' });
```

## 💾 Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Site Name
NEXT_PUBLIC_SITE_DESCRIPTION=Your site description
```

## 📚 Utility Functions

```typescript
import { 
  cn,                 // Merge class names
  formatPrice,        // Format currency
  formatDate,         // Format dates
  truncateText,       // Truncate strings
  slugify,            // Convert to URL slug
  debounce,           // Debounce function
  throttle            // Throttle function
} from '@/lib/utils';
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t myapp .
docker run -p 3000:3000 myapp
```

### Traditional Server
```bash
npm run build
npm start
```

## ✅ Production Checklist

- [ ] Update SEO config in `src/config/seo.ts`
- [ ] Set correct environment variables
- [ ] Add company information
- [ ] Test all API endpoints
- [ ] Check mobile responsiveness
- [ ] Verify SEO metadata
- [ ] Enable compression
- [ ] Set up CDN
- [ ] Configure SSL certificate
- [ ] Set up monitoring/logging

## 📞 Need Help?

- **Documentation**: Read `SETUP_COMPLETE.md`
- **Structure**: Check `PROJECT_STRUCTURE.md`
- **Types**: Look at `src/types/index.ts`
- **Validation**: See `src/lib/validation.ts`

## 🎓 Learning Path

1. **Day 1**: Create pages and explore structure
2. **Day 2**: Build API endpoints
3. **Day 3**: Add forms with validation
4. **Day 4**: Integrate database
5. **Day 5**: Deploy to production

---

**Happy coding! 🚀**

Everything is ready. Start with: `npm run dev`
