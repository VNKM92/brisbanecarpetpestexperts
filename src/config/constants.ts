// API Endpoints
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  
  // Services
  SERVICES: '/api/services',
  SERVICE_BY_ID: (id: string) => `/api/services/${id}`,
  
  // Contact
  CONTACT: '/api/contact',
  
  // Testimonials
  TESTIMONIALS: '/api/testimonials',
  
  // Blog
  BLOG: '/api/blog',
  BLOG_BY_ID: (id: string) => `/api/blog/${id}`,
  
  // Pricing
  PRICING: '/api/pricing',
  
  // Authentication (if applicable)
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGOUT: '/api/auth/logout',
};

// Application Constants
export const APP_CONFIG = {
  pageSize: 10,
  cacheDuration: 3600, // 1 hour
  requestTimeout: 30000, // 30 seconds
};

// Service Categories
export const SERVICE_CATEGORIES = [
  'Residential Cleaning',
  'Commercial Cleaning',
  'Bond Cleaning',
  'Carpet Cleaning',
  'Window Cleaning',
  'Specialized Cleaning',
];

// Pricing Plans
export const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for small homes',
    price: 99,
    features: [
      'General cleaning',
      'Bathrooms & kitchen',
      'Floors & carpets',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Most popular for families',
    price: 199,
    features: [
      'All Basic features',
      'Deep cleaning',
      'Window cleaning',
      'Laundry service',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Complete home care',
    price: 299,
    features: [
      'All Standard features',
      'Carpet shampooing',
      'Upholstery cleaning',
      'Priority scheduling',
    ],
  },
];
