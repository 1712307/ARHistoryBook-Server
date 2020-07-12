let router = require("express").Router();
let Activity = require("./activity.model");
let { isEmail } = require("validator");
let { tokenValidator } = require("../Account/token");

router.get("/:id", tokenValidator, function(req, res, next) {
  let id = req.params.id;
  Activity.selectByID(id)
    .then(function(user){
      res.status(200).send(user);
    })
    .catch(next);
}); 

router.post("/create", tokenValidator, function(req, res, next) {
  console.log('in')
  let allowedFields = ["id","score","done","user_id","sec_id"];
  let patch = {};
  try {
    allowedFields.forEach(function(key) {
      patch[key] = req.body[key];
    });
  } catch (message) {
    res.status(400).send({
      http: 400,
      code: "INVALID_INFO",
      message
    });
    return;
  }
  Activity.createActivity(patch)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 

router.post("/update", tokenValidator, function(req, res, next) {
  let allowedFields = ["id","score","done","user_id","sec_id"];
  let patch = {};
  try {
    allowedFields.forEach(function(key) {
      patch[key] = req.body[key];
    });
  } catch (message) {
    res.status(400).send({
      http: 400,
      code: "INVALID_INFO",
      message
    });
    return;
  }
  console.log(patch)
  Activity.updateActivity(patch)
  .then((rows) =>{
    res.status(200).send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 
module.exports = router;
 