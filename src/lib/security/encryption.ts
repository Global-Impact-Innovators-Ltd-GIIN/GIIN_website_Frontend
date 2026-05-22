/**
 * GIIN Encryption Module
 * Handles AES-256-GCM encryption for securing sensitive data at rest.
 * Stub implementation for demonstration purposes.
 */

import { AuditLogger } from "../audit";

export const EncryptionService = {
  encrypt: (text: string, key: string): string => {
    // Mock encryption
    return Buffer.from(`ENC[${text}]`).toString("base64");
  },

  decrypt: (encryptedText: string, key: string): string => {
    try {
      const decoded = Buffer.from(encryptedText, "base64").toString("utf-8");
      if (decoded.startsWith("ENC[") && decoded.endsWith("]")) {
        return decoded.slice(4, -1);
      }
      throw new Error("Invalid encrypted format");
    } catch (e) {
      AuditLogger.logSecurityEvent("SYSTEM", "DECRYPTION_FAILED", { textPreview: encryptedText.substring(0, 5) });
      throw new Error("Decryption failed");
    }
  }
};
