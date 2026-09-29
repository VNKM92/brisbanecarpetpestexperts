# Project Structure Guide

## 📁 Directory Structure

```
carpet/
├── public/                    # Static files
│   ├── images/               # Image assets
│   ├── icons/                # Icon assets
│   ├── fonts/                # Custom fonts
│   └── robots.txt            # SEO robots file
│
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (frontend)/       # Frontend routes group
│   │   ├── api/              # API routes (backend)
│   │   │   ├── services/     # Services endpoints
│   │   │   ├── contact/      # Contact endpoints
│   │   │   ├── blog/         # Blog endpoints
│   │   │   └── auth/         # Authentication endpoints
│   │   ├── sitemap.ts        # SEO sitemap
│   │   └── layout.tsx        # Root layout
│   │
│   ├── components/           # Reusable React components
│   │   ├── layout/           # Layout components
│   │   ├── common/           # Common components (Nav, Footer, etc)
│   │   ├── sections/         # Page sections
│   │   ├── forms/            # Form components
│   │   ├── ui/               # UI components (Button, Card, etc)
│   │   └── index.ts          # Barrel export
│   │
│   ├── config/               # Configuration files
│   │   ├── seo.ts            # SEO configuration
│   │   └── constants.ts      # App constants
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useApi.ts         # API fetching hook
│   │   ├── useForm.ts        # Form handling hook
│   │   └── index.ts          # Barrel export
│   │
│   ├── lib/                  # Utility libraries
│   │   ├── api-client.ts     # Axios client setup
│   │   ├── api-handlers.ts   # API response handlers
│   │   ├── metadata.ts       # Metadata generation
│   │   ├── utils.ts          # General utilities
│   │   ├── validation.ts     # Zod validation schemas
│   │   └── middleware.ts     # API middleware
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Global types
│   │
│   ├── context/              # React context (if needed)
│   │   └── index.ts
│   │
│   ├── middleware.ts         # Next.js global middleware
│   └── env.d.ts              # Environment types
│
├── .env.local                # Local environment variables
├── .env.example              # Example environment file
├── .eslintrc.json            # ESLint configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # Project documentation
```

## 🗂️ File Organization Principles

### Components Organization
- **Layout**: Navigation, Footer, Header components
- **Common**: Reusable components like Button, Card, Modal
- **Sections**: Full page sections (Hero, Services, Testimonials)
- **Forms**: Form-specific components
- **UI**: Small, atomic UI components

### API Routes Structure
```
api/
├── services/
│   ├── route.ts         (GET all services)
│   └── [id]/
│       └── route.ts     (GET/PUT/DELETE specific service)
├── contact/
│   └── route.ts         (POST contact form)
├── blog/
│   ├── route.ts         (GET all posts)
│   └── [slug]/
│       └── route.ts     (GET specific post)
└── auth/
    ├── login/
    │   └── route.ts
    ├── register/
    │   └── route.ts
    └── logout/
        └── route.ts
```

## 🔑 Key Features

### 1. **SEO Optimization**
- Auto-generated sitemap (`sitemap.ts`)
- robots.txt for search engines
- Structured metadata generation
- Schema markup support
- Open Graph tags
- Twitter Card integration

### 2. **API Management**
- Centralized API client with Axios
- Request/response interceptors
- Error handling with proper status codes
- CORS support
- Rate limiting ready
- Bearer token authentication

### 3. **Form Validation**
- Zod schema validation
- Type-safe form handling
- Custom hooks for forms
- Validation error messages

### 4. **Type Safety**
- Comprehensive TypeScript setup
- Global type definitions
- API response types
- Entity types (User, Service, Blog, etc)

### 5. **Utilities**
- Helper functions for common tasks
- String manipulation (slugify, truncate)
- Date/price formatting
- Debounce and throttle functions
- URL validation

## 📋 Common Tasks

### Adding a New Page
1. Create folder in `src/app/(frontend)/[page-name]/`
2. Add `page.tsx` with layout
3. Use `generateMetadata()` for SEO
4. Create components in `src/components/`

### Creating API Endpoint
1. Create folder in `src/app/api/[resource]/`
2. Use `successResponse()` and `errorResponse()` helpers
3. Validate with Zod schemas
4. Handle CORS with `handleCors()`

### Adding Custom Hook
1. Create file in `src/hooks/`
2. Export from `src/hooks/index.ts`
3. Use in components

### Fetching Data
```typescript
import { useFetch } from '@/hooks';

function MyComponent() {
  const { data, loading, error, fetch } = useFetch('/api/services');
  
  useEffect(() => {
    fetch();
  }, [fetch]);
  
  return <div>{loading ? 'Loading...' : data?.map(...)}</div>;
}
```

## 🔒 Security Features

- ✅ Content Security Policy headers
- ✅ XSS Protection
- ✅ CSRF prevention ready
- ✅ Rate limiting support
- ✅ Bearer token authentication
- ✅ CORS configuration

## 📊 Environment Variables

Required environment variables in `.env.local`:
- `NEXT_PUBLIC_API_URL` - API base URL
- `NEXT_PUBLIC_SITE_URL` - Site URL
- `NEXT_PUBLIC_SITE_NAME` - Site name
- `NEXT_PUBLIC_SITE_DESCRIPTION` - SEO description

## 🚀 Production Ready

This structure is:
- ✅ Scalable for growing teams
- ✅ SEO optimized out of the box
- ✅ API-first architecture
- ✅ Type-safe with TypeScript
- ✅ Performance optimized
- ✅ Security hardened
- ✅ Follows Next.js best practices
