const shortid = require("shortid");
const urlModel = require("../model/urlSchema");
const handleGenerateNewShortUrl = async (req, res) => {
  const shortId = shortid.generate();
  const body = req.body;
  if (!body) {
    res.status(400).json({
      success: false,
      message: "body is undefinded",
    });
  }
  const redirectUrl = body.url;

  await urlModel.create({
    shortId,
    redirectUrl,

    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortId,
  });
  // res.status(200).json({
  //   success: true,
  //   shortId,
  // });
};
const redirectToUrl = async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await urlModel.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
};

const handleGetAnalaytics = async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await urlModel.findOne({ shortId });
  res.status(200).json({
    totalClicks: entry.visitHistory.length,
    analytic: entry.visitHistory,
  });
};
module.exports = {
  handleGenerateNewShortUrl,
  redirectToUrl,
  handleGetAnalaytics,
};
