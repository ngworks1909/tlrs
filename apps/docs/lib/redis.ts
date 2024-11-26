import Redis from 'ioredis';

let redis: Redis | null = null;

const getRedisClient = (): Redis => {
    if (!redis) {
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        redis = new Redis(process.env.REDIS_URL ?? '');
    }
    return redis;
};

export default getRedisClient();
