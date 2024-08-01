module.exports = function routes(log) {
	const router = require("express").Router();

	function testCheck(req, res, next) {
		log.info("testCheck()");
		log.info(req.body);
		next();
	}

	router.get("/index", testCheck, async function (req, res) {
		log.info("PATH: /first-web/index");
		res.render("index");
	});

	router.get("/contacte", testCheck, async function (req, res) {
		log.info("PATH: /first-web/contacte");
		res.render("contacte");
	});

	router.get("/references", testCheck, async function (req, res) {
		log.info("PATH: /first-web/references");
		res.render("references");
	});

	router.post("/form_result", testCheck, async function (req, res) {
		log.info("PATH: /first-web/form_result");
		console.log(req.body);
		res.render("form_result", { form_data: req.body });
	});

	router.all("/*", (req, res) => {
		res.redirect("/first-web/index");
	});

	return router;
};
