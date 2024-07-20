const express = require("express");
require("dotenv").config();
const { connect } = require("./config/connec");
const cookiePaser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");
const jobTypeRouter = require("./routes/jobType");
const { errorHandler } = require("./middlewares/Error");

//instansce of express
const app = express();
//connection to datbase
connect();

//middlewares
app.use(morgan("dev"));
//cors is enabled for all origins
app.use(cors());
app.use(cookiePaser());
app.use(express.json());

//error middleware
app.use(errorHandler);

//auth api
app.use("/api", authRouter);
//user api
app.use("/api", userRouter);
//job api
app.use("/api", jobRouter);
app.use("/api", jobTypeRouter);

//port
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is started on port no. ${PORT}`);
});
