// Redis Caching Utilities
// Note: Requires 'ioredis' package: npm install ioredis

import Redis from 'ioredis';

// Redis client singleton
let redis: Redis | null = null;

export function getRedisClient(): Redis {
    if (!redis) {
        redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
            maxRetriesPerRequest: 3,
            retryStrategy(times) {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
        });

        redis.on('error', (error) => {
            console.error('Redis connection error:', error);
        });

        redis.on('connect', () => {
            console.log('Redis connected successfully');
        });
    }

    return redis;
}

// Cache operations
export class RedisCache {
    private client: Redis;

    constructor() {
        this.client = getRedisClient();
    }

    // Set value with TTL (in seconds)
    async set(key: string, value: any, ttl: number = 3600): Promise<void> {
        try {
            const serialized = JSON.stringify(value);
            await this.client.setex(key, ttl, serialized);
        } catch (error) {
            console.error('Redis set error:', error);
        }
    }

    // Get value
    async get<T>(key: string): Promise<T | null> {
        try {
            const value = await this.client.get(key);
            if (!value) return null;
            return JSON.parse(value) as T;
        } catch (error) {
            console.error('Redis get error:', error);
            return null;
        }
    }

    // Delete value
    async delete(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error('Redis delete error:', error);
        }
    }

    // Check if key exists
    async exists(key: string): Promise<boolean> {
        try {
            const result = await this.client.exists(key);
            return result === 1;
        } catch (error) {
            console.error('Redis exists error:', error);
            return false;
        }
    }

    // Increment value
    async increment(key: string, amount: number = 1): Promise<number> {
        try {
            return await this.client.incrby(key, amount);
        } catch (error) {
            console.error('Redis increment error:', error);
            return 0;
        }
    }

    // Set with expiry
    async setWithExpiry(key: string, value: any, expiryDate: Date): Promise<void> {
        try {
            const ttl = Math.floor((expiryDate.getTime() - Date.now()) / 1000);
            if (ttl > 0) {
                await this.set(key, value, ttl);
            }
        } catch (error) {
            console.error('Redis setWithExpiry error:', error);
        }
    }

    // Get multiple keys
    async mget<T>(keys: string[]): Promise<(T | null)[]> {
        try {
            const values = await this.client.mget(...keys);
            return values.map((v) => (v ? JSON.parse(v) as T : null));
        } catch (error) {
            console.error('Redis mget error:', error);
            return keys.map(() => null);
        }
    }

    // Set multiple keys
    async mset(items: Record<string, any>, ttl: number = 3600): Promise<void> {
        try {
            const pipeline = this.client.pipeline();
            Object.entries(items).forEach(([key, value]) => {
                const serialized = JSON.stringify(value);
                pipeline.setex(key, ttl, serialized);
            });
            await pipeline.exec();
        } catch (error) {
            console.error('Redis mset error:', error);
        }
    }

    // Clear all keys matching pattern
    async clearPattern(pattern: string): Promise<void> {
        try {
            const keys = await this.client.keys(pattern);
            if (keys.length > 0) {
                await this.client.del(...keys);
            }
        } catch (error) {
            console.error('Redis clearPattern error:', error);
        }
    }

    // Get TTL
    async getTTL(key: string): Promise<number> {
        try {
            return await this.client.ttl(key);
        } catch (error) {
            console.error('Redis getTTL error:', error);
            return -1;
        }
    }
}

// Cache decorator for functions
export function cached(ttl: number = 3600) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        const cache = new RedisCache();

        descriptor.value = async function (...args: any[]) {
            const cacheKey = `${propertyKey}:${JSON.stringify(args)}`;

            // Try to get from cache
            const cached = await cache.get(cacheKey);
            if (cached !== null) {
                return cached;
            }

            // Execute original method
            const result = await originalMethod.apply(this, args);

            // Store in cache
            await cache.set(cacheKey, result, ttl);

            return result;
        };

        return descriptor;
    };
}

// Session management
export class RedisSessionStore {
    private cache: RedisCache;
    private prefix: string = 'session:';

    constructor() {
        this.cache = new RedisCache();
    }

    async createSession(userId: string, data: any, ttl: number = 86400): Promise<string> {
        const sessionId = `${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const key = `${this.prefix}${sessionId}`;
        await this.cache.set(key, data, ttl);
        return sessionId;
    }

    async getSession(sessionId: string): Promise<any | null> {
        const key = `${this.prefix}${sessionId}`;
        return await this.cache.get(key);
    }

    async updateSession(sessionId: string, data: any, ttl: number = 86400): Promise<void> {
        const key = `${this.prefix}${sessionId}`;
        await this.cache.set(key, data, ttl);
    }

    async deleteSession(sessionId: string): Promise<void> {
        const key = `${this.prefix}${sessionId}`;
        await this.cache.delete(key);
    }
}

// Rate limiting with Redis
export class RedisRateLimiter {
    private cache: RedisCache;

    constructor() {
        this.cache = new RedisCache();
    }

    async checkLimit(
        identifier: string,
        limit: number,
        windowSeconds: number
    ): Promise<{ allowed: boolean; remaining: number }> {
        const key = `ratelimit:${identifier}`;
        const current = await this.cache.increment(key);

        if (current === 1) {
            // First request, set expiry
            await this.cache.setWithExpiry(key, current, new Date(Date.now() + windowSeconds * 1000));
        }

        const allowed = current <= limit;
        const remaining = Math.max(0, limit - current);

        return { allowed, remaining };
    }
}

// Export singleton instance
export const redisCache = new RedisCache();
export const redisSessionStore = new RedisSessionStore();
export const redisRateLimiter = new RedisRateLimiter();
