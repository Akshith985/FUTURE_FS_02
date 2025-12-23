import { Pool } from '@neondatabase/serverless';

// Initialize the pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default pool;