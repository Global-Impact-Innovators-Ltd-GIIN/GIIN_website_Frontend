import prisma from "@/lib/prisma";

/**
 * GIIN Enterprise Audit System
 * Centralized logging for tracking sensitive actions across the platform.
 */

export type AuditAction =
  | 'LOAN_APPROVED'
  | 'LOAN_REJECTED'
  | 'REPAYMENT_PROCESSED'
  | 'INVOICE_GENERATED'
  | 'RECEIPT_GENERATED'
  | 'COLLATERAL_RELEASED'
  | 'SETTINGS_MODIFIED'
  | 'USER_CREATED'
  | 'USER_SUSPENDED'
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE';

export const AuditLogger = {
  /**
   * Logs a security or financial event to the permanent audit log.
   */
  logEvent: async (params: {
    userId?: string;
    loanId?: string;
    action: AuditAction;
    details?: any;
    ipAddress?: string;
    affectedRecord?: string;
  }) => {
    const timestamp = new Date().toISOString();

    // 1. Console visibility for ops
    console.log(`[AUDIT] ${timestamp} | Action: ${params.action} | User: ${params.userId || 'SYSTEM'}`);

    // 2. Persistent storage in DB
    try {
      await prisma.loanAuditLog.create({
        data: {
          userId: params.userId,
          loanId: params.loanId,
          actionType: params.action,
          details: params.details,
          ipAddress: params.ipAddress,
          affectedRecord: params.affectedRecord,
          timestamp: new Date()
        }
      });
    } catch (e) {
      console.error("CRITICAL: Failed to write to Audit Log database", e);
    }
  },

  logSystemError: (context: string, error: Error) => {
    const timestamp = new Date().toISOString();
    console.error(`[SYS_ERR] ${timestamp} | Context: ${context} | Error: ${error.message}`);
  }
};
