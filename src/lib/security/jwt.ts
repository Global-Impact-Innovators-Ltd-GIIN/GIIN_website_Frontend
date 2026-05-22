import { SignJWT, jwtVerify } from "jose";
import { AuditLogger } from "../audit";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "GIIN-Super-Secret-Enterprise-Key-2026!"
);

export const JWTService = {
  sign: async (payload: Record<string, unknown>): Promise<string> => {
    try {
      const jwt = await new SignJWT(payload as any)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(SECRET_KEY);
      return jwt;
    } catch (error) {
      AuditLogger.logSystemError("JWT_SIGN", error as Error);
      throw new Error("Failed to sign token");
    }
  },

  verify: async (token: string): Promise<Record<string, unknown> | null> => {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      return payload;
    } catch (e) {
      AuditLogger.logSecurityEvent("SYSTEM", "JWT_VERIFICATION_FAILED", { tokenPreview: token.substring(0, 10) });
      return null;
    }
  }
};
