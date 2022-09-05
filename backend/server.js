const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const workoutsRouter = require("./routers/workoutRouters");
const userRouter = require("./routers/userRouter");

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/workout", workoutsRouter);
//connection
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App is listening at port ${process.env.PORT}`);
      console.log(`Connection to database is ready`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
