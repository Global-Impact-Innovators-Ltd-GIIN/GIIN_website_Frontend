/**
 * GIIN Device & Session Monitoring Module
 * Parses User-Agent strings and manages device fingerprinting to detect anomalous logins.
 */

export const DeviceMonitor = {
  parseUserAgent: (userAgent: string | null) => {
    // Basic mock parser
    const isMobile = userAgent?.includes("Mobile") || false;
    const isBot = userAgent?.includes("bot") || userAgent?.includes("spider") || false;
    
    return {
      isMobile,
      isBot,
      raw: userAgent || "Unknown"
    };
  },

  detectAnomaly: (currentIp: string, knownIps: string[]): boolean => {
    // If the IP is entirely new, flag as an anomaly
    return !knownIps.includes(currentIp);
  }
};
