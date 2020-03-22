const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");

//--- Import Routes
const authRoute = require("./routes/user");
const postServerRoute = require("./routes/sfsPost");
const postTeamRoute = require("./routes/sftPost");

//--- Initialize DotEnv
env.config();

//--- Connect To Mongo
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected");
  })
  .catch(error => {
    console.log(error);
  });

//--- Middleware
app.use(express.json());

//--- Route Middlewares
app.use("/api/users", authRoute);
app.use("/api/posts/sfs", postServerRoute);
app.use("/api/posts/sft", postTeamRoute);

//--- Start
app.listen(3000, () => console.log("RUNNING"));
