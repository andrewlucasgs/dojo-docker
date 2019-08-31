const express = require("express");
const app = express();
const router = express.Router();

router.use("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
app.use("/", router);

app.listen(3000, function() {
  console.log("Listening on port 3000!");
});
