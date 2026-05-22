/**
 * GIIN Global Cache System
 * Abstraction layer for caching expensive database or API queries.
 * In production, this can wrap Next.js `unstable_cache` or a direct Redis instance.
 */

const cacheStore = new Map<string, { value: unknown, expiry: number }>();

export const CacheSystem = {
  get: async <T>(key: string): Promise<T | null> => {
    const record = cacheStore.get(key);
    if (!record) return null;
    
    if (Date.now() > record.expiry) {
      cacheStore.delete(key);
      return null;
    }
    
    return record.value as T;
  },

  set: async (key: string, value: unknown, ttlSeconds: number = 3600) => {
    const expiry = Date.now() + (ttlSeconds * 1000);
    cacheStore.set(key, { value, expiry });
  },

  invalidate: async (key: string) => {
    cacheStore.delete(key);
  }
};
