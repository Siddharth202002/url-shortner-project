const express = require("express");
const urlModel = require("../model/urlSchema");
const { restrictTo } = require("../middleware/auth");
const staticRouter = express.Router();

staticRouter.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const id = req.user._id;
  const allUrls = await urlModel.find({});
  res.render("home", {
    urls: allUrls,
  });
});
staticRouter.get("/", restrictTo(["NORMAL","ADMIN"]), async (req, res) => {
  const id = req.user._id;
  const allUrls = await urlModel.find({ createdBy: id });
  res.render("home", {
    urls: allUrls,
  });
});
staticRouter.get("/signup", (req, res) => {
  res.render("signup");
});
staticRouter.get("/login", (req, res) => {
  res.render("login");
});
module.exports = staticRouter;
