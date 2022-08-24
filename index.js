const express = require("express");
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");

const app = express();
const jsonParser = express.json();

const PORT = process.env.PORT || 4000;

app.use(jsonParser);

app.use("/images", imageRouter);
app.use("/images/auth/messy", imageRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
