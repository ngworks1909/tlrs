import Redis from 'ioredis';

let redis: Redis | null = null;

const getRedisClient = (): Redis => {
    if (!redis) {
        redis = new Redis(`${process.env.QUEUE_REDIS_URL}`);
    }
    return redis;
};

export default getRedisClient();
