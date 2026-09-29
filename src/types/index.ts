/**
 * Common API Response Types
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

/**
 * Service Types
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  duration: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Blog Types
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  featured: boolean;
}

/**
 * Testimonial Types
 */

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  title: string;
  comment: string;
  rating: number;
  serviceUsed: string;
  date: Date;
}

/**
 * Pricing Types
 */

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  popular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Types
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'staff';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Types
 */

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  scheduledDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Contact Form Types
 */

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}
