import { prisma } from './prisma';

export type ActivityAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'LOGIN'
  | 'LOGOUT'
  | 'EXPORT'
  | 'STATUS_CHANGE'
  | 'SETTINGS_CHANGE'
  | 'EMAIL_SENT'
  | 'WHATSAPP_SENT'
  | 'APPROVAL'
  | 'PAYMENT'
  | string;

interface LogActivityParams {
  userId?: string | null;
  userName?: string | null;
  action: ActivityAction;
  module: string;
  entityId?: string | null;
  details?: Record<string, any> | string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export async function logActivity(params: LogActivityParams) {
  try {
    const detailsString =
      typeof params.details === 'object' && params.details !== null
        ? JSON.stringify(params.details)
        : params.details || undefined;

    await prisma.activityLog.create({
      data: {
        userId: params.userId || undefined,
        userName: params.userName || 'System',
        action: params.action,
        module: params.module,
        entityId: params.entityId || undefined,
        details: detailsString,
        ipAddress: params.ipAddress || undefined,
        userAgent: params.userAgent || undefined,
      },
    });
  } catch (error) {
    console.error('Failed to write activity log:', error);
  }
}
