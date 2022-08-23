const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = new Router();

const Users = require("../models").user;

router.get("/", async (req, res, next) => {
  const allUsers = await Users.findAll();
  res.send(allUsers);
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("please provide all required information");
    } else {
      const newUser = await Users.create({
        email,
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    console.log(e);
    next();
  }
});

module.exports = router;
