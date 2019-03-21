import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Database connected');
});

const createTables = () => {
  const sql = `
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS messages CASCADE;
  DROP TABLE IF EXISTS inbox CASCADE;
  DROP TABLE IF EXISTS groups CASCADE;
  DROP TABLE IF EXISTS groups_members CASCADE;
  
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) unique NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_on TIMESTAMP NOT NULL
  );
  
  CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    sender_id INTEGER NOT NULL,
    created_on TIMESTAMP NOT NULL,
    parent_message_id INTEGER,
    FOREIGN KEY(sender_id) REFERENCES users(id)
  );
  
  CREATE TABLE inbox(
    message_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    status VARCHAR(15) NOT NULL,
    FOREIGN KEY(message_id) REFERENCES messages(id) ON DELETE CASCADE,
    FOREIGN KEY(receiver_id) REFERENCES users(id) 
  );
  
  CREATE TABLE groups(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    group_email VARCHAR(255) NOT NULL,
    owner_id INTEGER NOT NULL,
    FOREIGN KEY(owner_id) REFERENCES users(id)
  );
  
  CREATE TABLE groups_members(
   group_id INTEGER NOT NULL,
   member_id INTEGER NOT NULL,
   FOREIGN KEY(group_id) REFERENCES groups(id),
   FOREIGN KEY(member_id) REFERENCES users(id) 
  );
  `;
  
  pool.query(sql)
    .then((res) => {
      console.log('Tables created');
      pool.end();
    })
    .catch((error) => {
      console.log(error);
      pool.end();
    });
};

createTables();
