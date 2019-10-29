const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.port || 8080;
const apiRouting = require("./api-routing");

app.get("/", (req, res) => res.send("Api server is up!"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use("/api", apiRouting);
