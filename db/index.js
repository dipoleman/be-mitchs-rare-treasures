const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'development';
const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;

// console.log(__dirname); // /Users/username/project-folder/db
// console.log(pathToCorrectEnvFile); // /Users/username/project-folder/.env.development

require('dotenv').config({
  path: pathToCorrectEnvFile,
});


if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}

module.exports = new Pool();

