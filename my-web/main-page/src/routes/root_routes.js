workData = [
	{
		position: "left",
		company_name: "Everis (NTT Data)",
		company_url: "https://es.nttdata.com/",
		work_description:
			"Java Developer specialized in task automation and system maintenance, contributing within an internal support team. Creator of efficient solutions to streamline processes and enhance system stability through Java development.",
		technologies: [
			{
				name: "Java",
				file: "java",
			},
		],
	},
	{
		position: "right",
		company_name: "PUE",
		company_url: "https://pue.es/",
		work_description:
			"Descripción del Trabajo 2. Aquí puedes incluir detalles sobre las responsabilidades, logros y cualquier otra información relevante.",
		technologies: [
			{
				name: "Java",
				file: "java",
			},
		],
	},
	{
		position: "right",
		company_name: "I+D+I PUE",
		company_url: "https://pue.es/",
		work_description:
			"Descripción del Trabajo 2. Aquí puedes incluir detalles sobre las responsabilidades, logros y cualquier otra información relevante.",
		technologies: [
			{
				name: "Java",
				file: "java",
			},
		],
	},
];

module.exports = function routes(log) {
	const router = require("express").Router();

	function testCheck(req, res, next) {
		log.info("testCheck()");
		log.info(req.body);
		next();
	}

	router.get("/", testCheck, async function (req, res) {
		log.info("PATH: /");
		res.render("index", { workData: workData });
	});

	router.all("/*", (req, res) => {
		res.redirect("/");
	});

	return router;
};
