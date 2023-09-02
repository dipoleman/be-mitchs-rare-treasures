const express = require("express");
const { getTreasures, postTreasures,patchTreasureById } = require("./controllers/treasure.controllers");
const { handlePsqlErrors, handleCustomErrors } = require("./errors");

const app = express();
app.use(express.json());

app.get("/api/treasures", getTreasures);

app.post("/api/treasures", postTreasures);

app.patch('/api/treasures/:treasure_id',patchTreasureById);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
