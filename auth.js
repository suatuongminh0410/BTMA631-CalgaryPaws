import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

const COOKIE = "paws_session";

function sessionToken() {
  return crypto
    .createHmac("sha256", process.env.APP_PASSWORD || "")
    .update("calgary-paws-whiskers")
    .digest("hex");
}

export function isLoggedIn() {
  if (!process.env.APP_PASSWORD) return false;
  const c = cookies().get(COOKIE);
  return !!c && c.value === sessionToken();
}

// Call at the top of any page or action that changes data.
export function requireLogin() {
  if (!isLoggedIn()) redirect("/login");
}

export function passwordMatches(attempt) {
  if (!process.env.APP_PASSWORD) return false;
  const a = crypto.createHash("sha256").update(String(attempt || "")).digest();
  const b = crypto.createHash("sha256").update(process.env.APP_PASSWORD).digest();
  return crypto.timingSafeEqual(a, b);
}

export function startSession() {
  cookies().set(COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function endSession() {
  cookies().delete(COOKIE);
}
