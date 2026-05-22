/**
 * GIIN Event-Driven Architecture Bus
 * Node.js EventEmitter abstraction for decoupled inter-service communication.
 */

import { EventEmitter } from 'events';

class GlobalEventBus extends EventEmitter {}
export const EventBus = new GlobalEventBus();

// Example constants
export const EVENTS = {
  USER_REGISTERED: 'user:registered',
  PAYMENT_PROCESSED: 'payment:processed',
  THREAT_DETECTED: 'security:threat_detected'
};

// Example usage:
// EventBus.on(EVENTS.THREAT_DETECTED, (payload) => {
//   AuditLogger.logSecurityEvent('SYSTEM', 'THREAT_DETECTED', payload);
// });
