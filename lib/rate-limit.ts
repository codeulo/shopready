/**
 * Minimal fixed-window rate limiter, keyed by an arbitrary string (e.g. IP).
 *
 * ⚠️ Same caveat as lib/order-store.ts: this Map is per-instance, so on
 * serverless it only rate-limits within a single warm instance, not
 * globally. It still blocks naive/burst abuse and costs nothing, but for
 * real protection put this behind Vercel's edge rate limiting or an
 * Upstash Redis-backed limiter (@upstash/ratelimit) in front of the route.
 */

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
