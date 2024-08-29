import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config({ path: '.env' });

export const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  searchPath: ['knex', 'public'],
  pool: { min: 2, max: 7 },
});
