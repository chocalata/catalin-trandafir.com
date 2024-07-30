const WhatsAppController = require("./models/WhatsAppController");

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

const whatsApp = new WhatsAppController(log);

//const root_routes = require("./routes/root_routes")(log, whatsApp);
const root_routes = require("./routes/router")(log, whatsApp);

//EXPRESS
const app = express();

//For POST and PUT requests (req.body)
app.use(bodyParser.json());

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Securing app with helmet, recommended practice by Express
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			mediaSrc: ["'self'"],
			scriptSrc: [
				"'self'",
				"https://www.google.com",
				"https://www.gstatic.com",
				"'unsafe-inline'",
			],
			scriptSrcElem: [
				"'self'",
				"https://www.google.com",
				"https://www.gstatic.com",
				"'unsafe-inline'",
			],
			frameSrc: ["'self'", "https://www.google.com"],
		},
	})
);

//LIBS paths
app.use(
	"/lib/three/build/",
	express.static(path.join(__dirname, "node_modules/three/build"))
);

app.use(
	"/lib/three/examples/jsm/",
	express.static(path.join(__dirname, "node_modules/three/examples/jsm"))
);

/*/Inserting floating-ui library
app.use(
	"/floating-ui",
	express.static(path.join(__dirname, "node_modules/@floating-ui/dom/dist"))
);

//Inserting floating-ui library
app.use(
	"/floating-ui",
	express.static(path.join(__dirname, "node_modules/@floating-ui/core/dist"))
);
*/
app.use(
	"/js/floating-ui/",
	express.static(path.join(__dirname, "node_modules/@floating-ui/dom/dist"))
);

app.use(
	"/js/floating-ui/",
	express.static(path.join(__dirname, "node_modules/@floating-ui/core/dist"))
);

//CSS paths
app.use("/css", express.static(__dirname + "/public/css"));

//JS paths
app.use("/js", express.static(__dirname + "/public/js"));

//IMG paths
app.use("/img", express.static(__dirname + "/public/img"));

//FONTS paths
app.use("/fonts", express.static(__dirname + "/public/fonts"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//ENDPOINTS
app.use("/", root_routes);

app.listen(process.env.PORT, () => {
	console.log(
		"################################################################################\n################################################################################"
	);
	console.log(
		"## Express is running on port " +
			process.env.PORT +
			" at " +
			Date() +
			" ##"
	);
	console.log(
		"################################################################################\n################################################################################"
	);
});

module.exports = app;
