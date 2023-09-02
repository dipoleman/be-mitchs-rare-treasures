const db = require("../db/index");

exports.selectTreasures = (sort_by = "age", order = "asc", colour) => {
  const validSortByValues = ["age", "cost_at_auction", "treasure_name"];

  if (!validSortByValues.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }

  if (!["asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  const sort_key = `treasures.${sort_by}`;

  let queryValues = [];
  let query = `SELECT treasures.treasure_id, treasures.treasure_name, treasures.colour, treasures.age, treasures.cost_at_auction, shops.shop_name
  FROM treasures
  JOIN shops ON treasures.shop_id = shops.shop_id `;

  if (colour) {
    query += `WHERE treasures.colour = $1 `;
    queryValues.push(colour);
  }

  if (sort_by) {
    query += `ORDER BY ${sort_key} ${order} `;
  }

  return db.query(query, queryValues).then(({ rows }) => {
    return rows;
  });
};

exports.addTreasures = (newTreasure) => {
  // console.log(newTreasure, "im in the POST model");

  return db
    .query(
      `INSERT INTO treasures
(treasure_name,colour,age,cost_at_auction,shop_id)
VALUES
($1,$2,$3,$4,$5) RETURNING *
`,
      [
        newTreasure.treasure_name,
        newTreasure.colour,
        newTreasure.age,
        newTreasure.cost_at_auction,
        newTreasure.shop_id,
      ]
    )
    .then(({ rows }) => {
      // console.log("Returned from PSQL ----------->\n", rows);
      return rows;
    });
};

exports.alterTreasureById = (treasure_id, cost_at_auction) => {
  return db
    .query(
      `UPDATE treasures 
  SET cost_at_auction = $1 
  WHERE treasure_id = $2
  RETURNING *
  `,
      [cost_at_auction, treasure_id]
    )
    .then(({ rows }) => {
      return rows
    });
};
