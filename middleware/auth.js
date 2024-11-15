const { getUser } = require("../service/auth");
// async function restrictToLoggedinUserOnly(req, res, next) {
//   const userId = req.cookies.uid;
//   if (!userId) return res.render("login");
//   const user = getUser(userId);
//   if (!user) return res.render("login");
//   req.user = user;
//   next();
// }
// async function checkAuth(req, res, next) {
//   const userId = req.cookies.uid;

//   const user = getUser(userId);

//   req.user = user;
//   next();
// }
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies.uid;
  
  
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.render("login");
    if (!roles.includes(req.user.role)) return res.end("Unauthorized");
    return next();
  };
}
module.exports = { checkForAuthentication,restrictTo };
