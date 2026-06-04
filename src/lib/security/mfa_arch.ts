/**
 * GIIN MFA (Multi-Factor Authentication) Architecture
 * Configuration-ready skeleton for Phase 3 Deliverables.
 */

export type MFAMethod = 'EMAIL_OTP' | 'SMS_OTP' | 'AUTHENTICATOR' | 'NONE';

export interface MFAConfig {
    enabled: boolean;
    primaryMethod: MFAMethod;
    enforceForFinancialActions: boolean;
}

export const MFAArchitecture = {
    /**
     * Placeholder for OTP Generation
     */
    generateOTP: () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    },

    /**
     * Requirement check for specific actions
     */
    requiresMFA: (action: string, config: MFAConfig) => {
        if (!config.enabled) return false;

        const highValueActions = ['loan.approve', 'loan.repay', 'loan.settings.edit'];
        if (config.enforceForFinancialActions && highValueActions.includes(action)) {
            return true;
        }

        return false;
    }
};
