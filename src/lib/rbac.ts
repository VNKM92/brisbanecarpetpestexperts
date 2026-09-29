import { TokenPayload } from './auth';

export const PERMISSIONS = {
  // Services
  SERVICES_READ: 'services:read',
  SERVICES_CREATE: 'services:create',
  SERVICES_UPDATE: 'services:update',
  SERVICES_DELETE: 'services:delete',

  // Enquiries & Bookings
  ENQUIRIES_READ: 'enquiries:read',
  ENQUIRIES_MANAGE: 'enquiries:manage',
  BOOKINGS_READ: 'bookings:read',
  BOOKINGS_MANAGE: 'bookings:manage',
  ORDERS_MANAGE: 'orders:manage',

  // CMS
  PAGES_MANAGE: 'pages:manage',
  BLOGS_MANAGE: 'blogs:manage',
  FAQS_MANAGE: 'faqs:manage',
  TESTIMONIALS_MANAGE: 'testimonials:manage',
  MEDIA_MANAGE: 'media:manage',

  // Users & System
  USERS_MANAGE: 'users:manage',
  ROLES_MANAGE: 'roles:manage',
  SETTINGS_MANAGE: 'settings:manage',
  LOGS_READ: 'logs:read',
} as const;

export function hasPermission(user: TokenPayload | null, requiredPermission: string): boolean {
  if (!user) return false;
  // Super admin has unrestricted access
  if (user.roleSlug === 'super-admin' || user.roleSlug === 'admin') return true;
  return user.permissions.includes(requiredPermission);
}

export function requirePermission(user: TokenPayload | null, requiredPermission: string) {
  if (!hasPermission(user, requiredPermission)) {
    throw new Error('Forbidden: You do not have permission to perform this action');
  }
}
