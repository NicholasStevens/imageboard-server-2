const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    res.send({
      jwt: toJWT({ userId: 7 }),
    });
  } catch (e) {
    console.log(e);
    next();
  }
});

module.exports = router;
