import { createClient } from 'redis';
import "dotenv/config";

export const redis_client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-16013.c44.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 16013
    }
});

