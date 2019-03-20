import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default {
  
  query(query, params) {
    return new Promise((resolve, reject) => {
      pool.query(query, params)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  },
};
