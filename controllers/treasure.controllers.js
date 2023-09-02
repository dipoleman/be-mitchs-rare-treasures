const {
  selectTreasures,
  addTreasures,
  alterTreasureById,
} = require("../models/treasure.models");

exports.getTreasures = (req, res, next) => {
  const { sort_by, order, colour } = req.query;
  selectTreasures(sort_by, order, colour)
    .then((treasures) => {
      if (treasures.length === 0) {
        return Promise.reject({ status: 400, msg: "Invalid query" });
      }
      res.status(200).send({ treasures });
    })
    .catch(next);
};

exports.postTreasures = (req, res, next) => {
  // console.log(req.query,'<------------from controller')
  // console.log(req.body);
  const newTreasure = req.body;
  addTreasures(newTreasure).then((treasures) => {
    // console.log(treasures,'<---------------from the controller again')
    res.status(201).send({ treasures });
  });
};

exports.patchTreasureById = (req, res) => {
  const { treasure_id } = req.params;
  const { cost_at_auction } = req.query;
  console.log(
    treasure_id,
    "<--------treasureId ",
    cost_at_auction,
    "<-----cost"
  );
  alterTreasureById(treasure_id, cost_at_auction)
  .then((treasures)=>{
    console.log(treasures)
    res.status(200).send({treasures})
  });
};
