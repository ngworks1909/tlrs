import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config();


const subscriber = new Redis(`${process.env.QUEUE_REDIS_URL}`);
export default subscriber;