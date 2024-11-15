const app = require("./app");
const PORT = parseInt(process.env.PORT) || 5002;

app.listen(PORT, () => {
  console.log("server started", PORT);
});
