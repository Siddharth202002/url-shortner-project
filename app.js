const express = require("express");
const { dbConnection } = require("./connection/connection");
require("dotenv").config();
const urlModel = require("./model/urlSchema");
const { checkForAuthentication,restrictTo } = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const { log } = require("console");

const path = require("path");
const URL = process.env.URL;
// routes
const router = require("./routes/urlRoutes");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/userRoute");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

dbConnection(URL);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)
app.use("/", staticRouter);
app.use("/url", restrictTo(["NORMAL","ADMIN"]), router);
app.use("/user", userRouter);

module.exports = app;
