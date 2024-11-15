const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortUrl,
  redirectToUrl,
  handleGetAnalaytics,
} = require("../controllers/urlController");
router.post("/", handleGenerateNewShortUrl);
router.get("/:shortid", redirectToUrl);
router.get("/analytic/:shortid", handleGetAnalaytics);
module.exports = router;
