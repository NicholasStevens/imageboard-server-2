const { Router } = require("express");
const router = new Router();

const Images = require("../models").image;
const { toData } = require("../auth/jwt");

router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      res.status(400).send("Please provide all required fields");
    } else {
      const newImage = await Images.create({ title, url });
      res.json(newImage);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  const limit = Math.min(req.query.limit || 25, 500);
  const offset = req.query.offset || 0;
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const result = await Images.findAndCountAll({ limit, offset });
      res.send({ images: result.rows, total: result.count });
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).send("no image found");
    } else {
      const oneImage = await Images.findByPk(id);
      res.json(oneImage);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
