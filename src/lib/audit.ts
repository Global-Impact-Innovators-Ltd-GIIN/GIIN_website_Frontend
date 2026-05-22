/**
 * GIIN Enterprise Audit System
 * Centralized logging for tracking sensitive actions across the platform.
 */

export const AuditLogger = {
  logSecurityEvent: (userId: string, action: string, details: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    console.log(`[SEC_AUDIT] ${timestamp} | User: ${userId} | Action: ${action}`, details);
    // In production, this writes to a secure append-only database or SIEM tool.
  },

  logSystemError: (context: string, error: Error) => {
    const timestamp = new Date().toISOString();
    console.error(`[SYS_ERR] ${timestamp} | Context: ${context} | Error: ${error.message}`);
    // In production, this forwards to Sentry or Datadog.
  }
};
