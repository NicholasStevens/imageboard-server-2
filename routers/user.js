const { Router } = require("express");
const router = new Router();

const Users = require("../models").user;

router.get("/", async (req, res, next) => {
  const allUsers = await Users.findAll();
  res.send(allUsers);
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    const newUser = await Users.create({ email, password, fullName });
    res.end(newUser);
  } catch (e) {
    console.log(e);
    next();
  }
});

module.exports = router;
