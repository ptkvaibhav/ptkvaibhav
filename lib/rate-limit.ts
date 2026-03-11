type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __contactRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

function getStore() {
  if (!global.__contactRateLimitStore) {
    global.__contactRateLimitStore = new Map<string, RateLimitEntry>();
  }

  return global.__contactRateLimitStore;
}

export function rateLimit(identifier: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const store = getStore();

  for (const [key, value] of store.entries()) {
    if (value.resetAt <= now) {
      store.delete(key);
    }
  }

  const current = store.get(identifier);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(identifier, { count: 1, resetAt });
    return {
      success: true,
      limit,
      remaining: Math.max(limit - 1, 0),
      resetAt,
    };
  }

  if (current.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetAt: current.resetAt,
    };
  }

  current.count += 1;
  store.set(identifier, current);

  return {
    success: true,
    limit,
    remaining: Math.max(limit - current.count, 0),
    resetAt: current.resetAt,
  };
}

