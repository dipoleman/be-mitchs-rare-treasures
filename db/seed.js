const db = require("./");
const format = require("pg-format");
const { extractShopNameAndId } = require("./utility-functions");

const seed = ({ shopData, treasureData }) => {
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      return db.query("DROP TABLE IF EXISTS shops");
    })
    .then(() => {
      return db.query(`CREATE TABLE shops (
		shop_id SERIAL PRIMARY KEY,
		shop_name TEXT NOT NULL,
		owner TEXT NOT NULL,
		slogan TEXT
		); `);
    })
    .then(() => {
      return db.query(`CREATE TABLE treasures (
		treasure_id SERIAL PRIMARY KEY,
		treasure_name TEXT NOT NULL,
		colour TEXT NOT NULL,
		age INT NOT NULL,
		cost_at_auction DECIMAL NOT NULL,
		shop_id INT REFERENCES shops(shop_id) ON DELETE CASCADE
	); `);
    })
    .then(() => {
      const formattedShops = shopData.map((shop) => {
        return [shop.shop_name, shop.owner, shop.slogan];
      });
      const queryStr = format(
        `
		INSERT INTO shops
		 (shop_name,owner,slogan)
		 VALUES %L RETURNING *;
		 `,
        formattedShops
      );
      return db.query(queryStr);
    })
    .then((returningData) => {
      const shops = extractShopNameAndId(returningData.rows);

      const formattedTreasures = treasureData.map((treasure) => {
        return [
          treasure.treasure_name,
          treasure.colour,
          treasure.age,
          treasure.cost_at_auction,
          shops[treasure.shop],
        ];
      });
      const queryStr = format(
        `
	  INSERT INTO treasures 
	  (treasure_name, colour, age, cost_at_auction, shop_id)
	  VALUES %L RETURNING *;
	  `,
        formattedTreasures
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
