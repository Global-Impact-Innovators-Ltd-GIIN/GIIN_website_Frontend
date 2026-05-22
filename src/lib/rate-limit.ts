/**
 * GIIN Enterprise Rate Limiter
 * Mock implementation of an IP-based rate limiting strategy.
 * In a true production environment, this would utilize Upstash Redis (`@upstash/ratelimit`).
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

// In-memory store for development/demo purposes
const requestCounts = new Map<string, { count: number, resetTime: number }>();

export function checkRateLimit(ip: string, config: RateLimitConfig = { maxRequests: 100, windowMs: 60000 }) {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    // New window
    requestCounts.set(ip, { count: 1, resetTime: now + config.windowMs });
    return { success: true, remaining: config.maxRequests - 1 };
  }

  if (record.count >= config.maxRequests) {
    // Rate limit exceeded
    return { success: false, remaining: 0, resetTime: record.resetTime };
  }

  // Increment
  record.count += 1;
  return { success: true, remaining: config.maxRequests - record.count };
}
