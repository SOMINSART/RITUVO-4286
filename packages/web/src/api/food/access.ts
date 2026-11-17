import { createHmac, timingSafeEqual } from "node:crypto";

/** Days shown without paying. Later days stay hidden until a valid unlock token is presented. */
export const FREE_DAYS = 2;

/** Price of the unlock, in euro cents. */
export const UNLOCK_PRICE_CENTS = 390;

function secret() {
  const s = process.env.UNLOCK_SECRET;
  if (!s) throw new Error("UNLOCK_SECRET is not configured");
  return s;
}

function sign(sessionId: string) {
  return createHmac("sha256", secret()).update(sessionId).digest("base64url");
}

/** Token handed to the browser after a verified payment: `<sessionId>.<signature>`. */
export function makeUnlockToken(sessionId: string) {
  return `${sessionId}.${sign(sessionId)}`;
}

/** True only when the token was issued by us for this session id. */
export function isUnlocked(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const sessionId = token.slice(0, dot);
  const given = Buffer.from(token.slice(dot + 1));
  const expected = Buffer.from(sign(sessionId));
  return given.length === expected.length && timingSafeEqual(given, expected);
}
