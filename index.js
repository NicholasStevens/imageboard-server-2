const express = require("express");
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");

const app = express();
const jsonParser = express.json();

const PORT = process.env.PORT || 4000;

app.use(jsonParser);

app.use("/images", imageRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
