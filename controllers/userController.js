const User = require("../model/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      message: "ever field is required",
    });
  }
  await User.create({
    name,
    email,
    password,
  });
  res.render("home");
};
const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    res.render("login");
  }
  // const sessionId = uuidv4();
  const token = setUser(user);
  res.cookie("uid", token);
  res.render("home");
};
module.exports = { handleUserSignup, handleUserLogin };
