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
  | 'WHATSAPP_SENT';

interface LogActivityParams {
  userId?: string;
  userName?: string;
  action: ActivityAction;
  module: string;
  entityId?: string;
  details?: Record<string, any> | string;
  ipAddress?: string;
  userAgent?: string;
}

export async function logActivity(params: LogActivityParams) {
  try {
    const detailsString =
      typeof params.details === 'object'
        ? JSON.stringify(params.details)
        : params.details;

    await prisma.activityLog.create({
      data: {
        userId: params.userId,
        userName: params.userName || 'System',
        action: params.action,
        module: params.module,
        entityId: params.entityId,
        details: detailsString,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
      },
    });
  } catch (error) {
    console.error('Failed to write activity log:', error);
  }
}
