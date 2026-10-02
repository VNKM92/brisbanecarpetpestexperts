import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'brisbane-carpet-pest-experts-secret-key-2026-super-secure';
const TOKEN_EXPIRY = '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  phone?: string | null;
  role: string;
  roleSlug: string;
  permissions: string[];
  customerId?: string | null;
  employeeId?: string | null;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export async function getAuthenticatedUser(request: NextRequest): Promise<TokenPayload | null> {
  // Check Authorization header
  const authHeader = request.headers.get('authorization');
  let token: string | null = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    // Check cookies (admin_token, customer_token, auth_token)
    const cookieToken =
      request.cookies.get('admin_token')?.value ||
      request.cookies.get('customer_token')?.value ||
      request.cookies.get('auth_token')?.value;
    if (cookieToken) {
      token = cookieToken;
    }
  }

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  // Verify user still exists & is active
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: {
      role: {
        include: {
          permissions: {
            include: { permission: true },
          },
        },
      },
      customer: true,
      employee: true,
    },
  });

  if (!user || user.status !== 'ACTIVE') return null;

  const permissions = user.role?.permissions.map((rp) => rp.permission.slug) || [];

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone || user.customer?.phone || user.employee?.phone || null,
    role: user.role?.name || 'Customer',
    roleSlug: user.role?.slug || 'customer',
    permissions,
    customerId: user.customer?.id || null,
    employeeId: user.employee?.id || null,
  };
}
