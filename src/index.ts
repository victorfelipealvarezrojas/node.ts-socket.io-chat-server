import { config } from 'dotenv';
import { serverClass } from './models/server';

config();
const server = new serverClass();

server.execute();