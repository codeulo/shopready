/**
 * Idempotency store for Paystack references.
 *
 * ⚠️ IMPORTANT: this in-memory implementation ONLY works correctly on a single
 * long-lived server instance. On serverless platforms (Vercel, etc.) every
 * function invocation can run in a fresh instance, so this Map will NOT be
 * shared between the webhook route and the verify route, and will NOT
 * survive cold starts. Treat this as a placeholder that makes the code
 * correct in shape — before going to production, swap the three functions
 * below for calls to a real store, e.g.:
 *   - Vercel KV / Upstash Redis: SET reference "processed" NX EX 2592000
 *   - Postgres/Supabase: a `paystack_orders` table with a UNIQUE(reference)
 *     constraint; catch the unique-violation error to detect duplicates
 *   - Any DB you already use in this project
 *
 * The interface is intentionally tiny so that swap is a one-file change.
 */

const processedReferences = new Map<string, { processedAt: number }>();

export async function isReferenceProcessed(
  reference: string,
): Promise<boolean> {
  return processedReferences.has(reference);
}

export async function markReferenceProcessed(reference: string): Promise<void> {
  processedReferences.set(reference, { processedAt: Date.now() });
}

/**
 * Attempts to atomically claim a reference for processing. Returns true if
 * this call is the one that gets to process it (i.e. it wasn't already
 * claimed), false if someone else already claimed it.
 *
 * With a real DB, implement this as an INSERT ... ON CONFLICT DO NOTHING
 * (or equivalent) and check the row count, so concurrent requests (e.g. the
 * webhook and the client-side verify call arriving at nearly the same time)
 * can't both send emails for the same payment.
 */
export async function claimReference(reference: string): Promise<boolean> {
  if (processedReferences.has(reference)) return false;
  processedReferences.set(reference, { processedAt: Date.now() });
  return true;
}
