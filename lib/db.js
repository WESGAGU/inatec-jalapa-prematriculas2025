import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Aquí se usa la variable de entorno
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
