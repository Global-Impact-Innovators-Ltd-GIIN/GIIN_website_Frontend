/**
 * Global API Logger
 * Acts as an APM simulator. Logs formatting and standardized error tracking.
 */

export const logger = {
  info: (message: string, meta?: any) => {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`, meta || '');
  },
  warn: (message: string, meta?: any) => {
    console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, meta || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`);
    if (error) {
      if (error instanceof Error) {
        console.error(error.stack);
      } else {
        console.error(error);
      }
    }
  },
  audit: (action: string, userId: string, details?: any) => {
    console.log(`[AUDIT] [${new Date().toISOString()}] User: ${userId} | Action: ${action}`, details || '');
  }
};
