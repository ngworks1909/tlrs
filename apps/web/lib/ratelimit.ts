import Redis from 'ioredis';
import { RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible';

let redis: Redis | null = null;

const getRedisClient = (): Redis => {
    if (!redis) {
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        redis = new Redis(process.env.RATE_LIMIT_REDIS_URL ?? '');
    }
    return redis;
};

export class RateLimitter {
    private static instance: RateLimitter;
    private readonly rateLimiters: Record<string, RateLimiterRedis>;
    private readonly redis: Redis;

    private constructor() {
        this.redis = getRedisClient();
        this.rateLimiters = {
            'user-register': new RateLimiterRedis({
                storeClient: this.redis,
                points: 20, // 20 requests
                duration: 300, // 5 minutes
            }),
            'user-login': new RateLimiterRedis({
                storeClient: this.redis,
                points: 20, // 20 requests
                duration: 300, // 5 minutes
            }),
            'user-update': new RateLimiterRedis({
                storeClient: this.redis,
                points: 20, // 20 requests
                duration: 300, // 5 minutes
            }),
            'user-create': new RateLimiterRedis({
                storeClient: this.redis,
                points: 5, // 5 requests
                duration: 2 * 60 * 60, // 2 hours
            }),
            'user-limit': new RateLimiterRedis({
                storeClient: this.redis,
                points: 5, // 5 requests
                duration: 60 * 60, // 1 hours
            }),
            'otp-limit': new RateLimiterRedis({
                storeClient: this.redis,
                points: 1, // 1 requests
                duration: 120, // 2 minutes
            }),
            'resend-limit': new RateLimiterRedis({
                storeClient: this.redis,
                points: 5, // 1 requests
                duration: 30 * 60, // 2 minutes
            }),
        };
    }

    public static getInstance(): RateLimitter {
        if (!RateLimitter.instance) {
            RateLimitter.instance = new RateLimitter();
        }
        return RateLimitter.instance;
    }

    private async isAllowed(limiter: RateLimiterRedis, key: string): Promise<boolean> {
        try {
            const result = await limiter.consume(key); // Try to consume a point
            return result.remainingPoints > 0;
        } catch (err) {
            // Cast `err` to `RateLimiterRes` if it's a rate-limiting error
            if ((err as RateLimiterRes).msBeforeNext !== undefined) {
                // Blocked due to rate limiting
                return false;
            }
            throw err; // Throw unexpected errors
        }
    }

    public async hasRegisterLimit(ipAddress: string): Promise<boolean> {
        const limiter = this.rateLimiters['user-register'];
        const key = `user-register:${ipAddress}`;
        return await this.isAllowed(limiter, key);
    }

    public async hasLoginLimit(ipAddress: string): Promise<boolean> {
        const limiter = this.rateLimiters['user-login'];
        const key = `user-login:${ipAddress}`;
        return await this.isAllowed(limiter, key);
    }

    public async hasUpdateUserLimit(ipAddress: string): Promise<boolean> {
        const limiter = this.rateLimiters['user-update'];
        const key = `user-update:${ipAddress}`;
        return await this.isAllowed(limiter, key);
    }

    public async hasCreateUserLimit(ipAddress: string): Promise<boolean> {
        const limiter = this.rateLimiters['user-create'];
        const key = `user-create:${ipAddress}`;
        return await this.isAllowed(limiter, key);
    }

    public async hasOtpVerifyLimit(ipAddress: string, email: string): Promise<boolean> {
        const userLimitter = this.rateLimiters['user-limit'];
        const userKey = `user-limit:${ipAddress}`;
        const emailLimitter = this.rateLimiters['otp-limit']
        const emailKey = `verify-otp:${email}`
        return await this.isAllowed(userLimitter, userKey) || await this.isAllowed(emailLimitter, emailKey);
    }

    public async hasResendLimit(ipAddress: string, email: string): Promise<boolean> {
        const resendLimitter = this.rateLimiters['resend-limit'];
        const userKey = `user-limit:${ipAddress}`;
        const emailLimitter = this.rateLimiters['otp-limit']
        const emailKey = `verify-otp:${email}`
        return await this.isAllowed(resendLimitter, userKey) || await this.isAllowed(emailLimitter, emailKey);
    }


}

const rateLimitter = RateLimitter.getInstance();
Object.freeze(rateLimitter);

export default rateLimitter;
