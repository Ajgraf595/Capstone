import { SignJWT, jwtVerify, JWTPayload } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  // In dev you *can* fall back, but TypeScript + security is cleaner with a hard check.
  // If you really want a dev fallback, I’ll show that version too.
  throw new Error("JWT_SECRET is missing in environment variables.");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export async function signToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}