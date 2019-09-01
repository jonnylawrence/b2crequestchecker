const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const serveStatic = require("serve-static");

const app = express();
const port = process.env.PORT || 80;
const path = require("path");

var jwt = require("jwt-simple");

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
app.use(serveStatic(path.join(__dirname, "dist")));

app.post("/register", (req, res) => {
  console.log("JWT encoder");
  var token = jwt.encode(`${req.body.jwttoken}`, `${req.body.clientid}`);
  res.send(`${token}`);
});

app.listen(port, () => console.log(`Your app listening on port ${port}`));
