import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "bharat_matdan_secret_key_2026_super_secure_sha256";

export interface TokenPayload {
  userId: string;
  epicNumber: string;
  fullName: string;
  role: string;
  stateId?: string | null;
  constituencyId?: string | null;
  stationId?: string | null;
  boothNumber?: number | null;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function getAuthSession(): TokenPayload | null {
  const cookieStore = cookies();
  const token = cookieStore.get("bmm_session")?.value;
  if (!token) return null;
  return verifyToken(token);
}
