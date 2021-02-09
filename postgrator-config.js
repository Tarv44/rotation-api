require('dotenv').config();
const { Pool } = require('pg')

const pool = new Pool({
  "migrationDirectory": "migrations",
  "ssl": { rejectUnauthorized: false },
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL,
})

module.exports = pool