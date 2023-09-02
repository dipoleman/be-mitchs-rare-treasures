exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code) {
      res.status(400).send({ msg: err.msg });
    } else next(err);
  };
  
  exports.handleCustomErrors = (err, req, res, next) => {
    console.log(err, "<------------from error handler");
    res.status(err.status).send({msg:err.msg});
  };