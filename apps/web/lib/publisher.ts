import Redis from 'ioredis';

let publisher: Redis | null = null;

const getRedisPublisher = (): Redis => {
    if (!publisher) {
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        publisher = new Redis(process.env.QUEUE_REDIS_URL ?? '');
    }
    return publisher;
};

export default getRedisPublisher();
