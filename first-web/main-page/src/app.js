const express = require("express");

const path = require("path");

const bodyParser = require("body-parser");

const helmet = require("helmet");

const Logger = require("bunyan");

const log = new Logger({
  name: "logger",
  streams: [
    {
      level: "info",
      stream: process.stdout,
    },
  ],
});

const root_routes = require("./routes/root_routes")(log);

//EXPRESS
const app = express();

//For POST and PUT requests (req.body)
app.use(bodyParser.json());

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Securing app with helmet, recommended practice by Express
app.use(
  //Executing drive videos.
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  }),
);

//CSS paths
app.use("/first-web/css", express.static(__dirname + "/public/css"));

//JS paths
app.use("/first-web/js", express.static(__dirname + "/public/js"));

//IMG paths
app.use("/first-web/img", express.static(__dirname + "/public/img"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//ENDPOINTS
app.use("/first-web", root_routes);

app.listen(process.env.PORT, () => {
  console.log(
    "Express is running on port " + process.env.PORT + " at " + Date(),
  );
});
