// const sessionIdToUserMap=new Map();
// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }
// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.secret_key;

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret_key
  );
}
function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret_key);
}

module.exports = {
  setUser,
  getUser,
};
