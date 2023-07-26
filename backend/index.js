const express = require("express");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
require("./db/mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("listening on port ", port);
});
