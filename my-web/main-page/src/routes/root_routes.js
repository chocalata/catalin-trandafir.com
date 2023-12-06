module.exports = function routes(log) {
	const router = require("express").Router();

	function testCheck(req, res, next) {
		log.info("testCheck()");
		log.info(req.body);
		next();
	}

	router.get("/", testCheck, async function (req, res) {
		log.info("PATH: /");
		res.render("index");
	});

	router.all("/*", (req, res) => {
		res.redirect("/");
	});

	return router;
};
