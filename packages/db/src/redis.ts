import Redis from 'ioredis';

const redisClientSingleton = () => {
  return new Redis(process.env.REDIS_URL as string);
};

type RedisClientSingleton = ReturnType<typeof redisClientSingleton>;

// eslint-disable-next-line
const globalForRedis = globalThis as unknown as {
  redis: RedisClientSingleton | undefined;
};

const redis = globalForRedis.redis ?? redisClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

export default redis;
