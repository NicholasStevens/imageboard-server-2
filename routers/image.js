const { Router } = require("express");
const router = new Router();

const Images = require("../models").image;

router.get("/", async (req, res, next) => {
  const allImages = await Images.findAll();
  res.send(allImages);
});

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
