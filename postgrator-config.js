require('dotenv').config();
const { Client } = require('pg')

const client = new Client({
  "migrationDirectory": "migrations",
  "ssl": { rejectUnauthorized: false },
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL,
})

module.exports = client