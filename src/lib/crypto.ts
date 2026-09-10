import crypto from "crypto";
import bcrypt from "bcryptjs";

/**
 * Computes a SHA-256 hash string.
 */
export function sha256(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

/**
 * Generates an anonymous cryptographic vote receipt hash.
 * This separates the voter's identity from their ballot choice while allowing audit verification.
 */
export function generateVoteReceipt(voterId: string, electionId: string, timestamp: number): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const raw = `${voterId}:${electionId}:${timestamp}:${salt}`;
  return "BMM-" + sha256(raw).substring(0, 24).toUpperCase();
}

/**
 * Computes tamper-evident audit log chaining hash.
 */
export function computeAuditHash(previousHash: string, action: string, entityId: string, details: string): string {
  const raw = `${previousHash}|${action}|${entityId}|${details}|${Date.now()}`;
  return sha256(raw);
}

/**
 * Password hashing using bcrypt / Argon2id equivalent salt rounds.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Password verification helper.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
