// /Users/username/project-folder/db/seed-dev.js
const data = require('./data/dev-data');
const seed = require('./seed');

const db = require('./');

seed(data).then(() => {
  return db.end();
});