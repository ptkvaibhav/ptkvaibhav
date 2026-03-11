import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type RateLimitResult = {
  configured: boolean;
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW = "1 m";

let ratelimit: Ratelimit | null | undefined;

function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

function getRateLimiter() {
  if (ratelimit !== undefined) {
    return ratelimit;
  }

  const redis = getRedisClient();

  if (!redis) {
    ratelimit = null;
    return ratelimit;
  }

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(DEFAULT_LIMIT, DEFAULT_WINDOW),
    analytics: true,
    prefix: "ratelimit:contact",
  });

  return ratelimit;
}

export function hasRateLimitConfig() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export async function rateLimit(identifier: string): Promise<RateLimitResult> {
  const limiter = getRateLimiter();

  if (!limiter) {
    return {
      configured: false,
      success: false,
      limit: DEFAULT_LIMIT,
      remaining: 0,
      resetAt: Date.now(),
    };
  }

  try {
    const result = await limiter.limit(identifier);

    return {
      configured: true,
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      resetAt: result.reset,
    };
  } catch {
    return {
      configured: false,
      success: false,
      limit: DEFAULT_LIMIT,
      remaining: 0,
      resetAt: Date.now(),
    };
  }
}
