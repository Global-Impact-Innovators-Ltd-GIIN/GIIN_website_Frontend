/**
 * GIIN Anti-Brute Force Module
 * Implements account lockout policies.
 */

// In-memory store for tracking failed attempts. 
// Note: In high-scale production, this should use Redis.
const loginAttempts = new Map<string, { count: number, lastAttempt: number }>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINS = 15;

export const SecurityPolicy = {
    /**
     * Checks if an IP or Email is currently locked out.
     */
    isLockedOut: (identifier: string): boolean => {
        const attempt = loginAttempts.get(identifier);
        if (!attempt) return false;

        const now = Date.now();
        const diffMins = (now - attempt.lastAttempt) / 1000 / 60;

        if (attempt.count >= MAX_ATTEMPTS && diffMins < LOCKOUT_DURATION_MINS) {
            return true;
        }

        // Reset if lockout duration has passed
        if (diffMins >= LOCKOUT_DURATION_MINS) {
            loginAttempts.delete(identifier);
            return false;
        }

        return false;
    },

    /**
     * Records a failed login attempt.
     */
    recordFail: (identifier: string): number => {
        const attempt = loginAttempts.get(identifier) || { count: 0, lastAttempt: 0 };
        attempt.count += 1;
        attempt.lastAttempt = Date.now();
        loginAttempts.set(identifier, attempt);
        return attempt.count;
    },

    /**
     * Resets attempts on successful login.
     */
    recordSuccess: (identifier: string) => {
        loginAttempts.delete(identifier);
    }
};
