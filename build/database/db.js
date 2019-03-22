"use strict";

var _dotenv = require("dotenv");

var _pg = require("pg");

(0, _dotenv.config)();
var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', function () {
  console.log('Database connected');
});

var createTables = function createTables() {
  var sql = "\n  DROP TABLE IF EXISTS users CASCADE;\n  DROP TABLE IF EXISTS messages CASCADE;\n  DROP TABLE IF EXISTS inbox CASCADE;\n  DROP TABLE IF EXISTS groups CASCADE;\n  DROP TABLE IF EXISTS groups_members CASCADE;\n  \n  CREATE TABLE users(\n    id SERIAL PRIMARY KEY,\n    first_name VARCHAR(255) NOT NULL,\n    last_name VARCHAR(255) NOT NULL,\n    username VARCHAR(255) unique NOT NULL,\n    password VARCHAR(255) NOT NULL,\n    email VARCHAR(255) NOT NULL,\n    created_on TIMESTAMP NOT NULL\n  );\n  \n  CREATE TABLE messages(\n    id SERIAL PRIMARY KEY,\n    subject VARCHAR(255) NOT NULL,\n    message TEXT NOT NULL,\n    sender_id INTEGER NOT NULL,\n    created_on TIMESTAMP NOT NULL,\n    parent_message_id INTEGER,\n    FOREIGN KEY(sender_id) REFERENCES users(id)\n  );\n  \n  CREATE TABLE inbox(\n    message_id INTEGER NOT NULL,\n    receiver_id INTEGER NOT NULL,\n    status VARCHAR(15) NOT NULL,\n    FOREIGN KEY(message_id) REFERENCES messages(id) ON DELETE CASCADE,\n    FOREIGN KEY(receiver_id) REFERENCES users(id) \n  );\n  \n  CREATE TABLE groups(\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(255) NOT NULL,\n    description VARCHAR(255) NOT NULL,\n    created_on TIMESTAMP NOT NULL,\n    group_email VARCHAR(255) NOT NULL,\n    owner_id INTEGER NOT NULL,\n    FOREIGN KEY(owner_id) REFERENCES users(id)\n  );\n  \n  CREATE TABLE groups_members(\n   group_id INTEGER NOT NULL,\n   member_id INTEGER NOT NULL,\n   FOREIGN KEY(group_id) REFERENCES groups(id),\n   FOREIGN KEY(member_id) REFERENCES users(id) \n  );\n  ";
  pool.query(sql).then(function (res) {
    console.log('Tables created');
    pool.end();
  }).catch(function (error) {
    console.log(error);
    pool.end();
  });
};

createTables();
//# sourceMappingURL=db.js.map