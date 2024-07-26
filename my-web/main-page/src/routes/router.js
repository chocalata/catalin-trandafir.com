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
			},
		],
	},
	{
		position: "right",
		company_name: "PUE",
		company_url: "https://pue.es/",
		work_description:
			"Performing the role of Full-stack and Systems Administrator, providing efficient solutions for the development and maintenance of systems. I handle both front-end and back-end, along with effective infrastructure management to ensure optimal performance.",
		technologies: [
			{
				name: "Docker",
			},
			{
				name: "Python",
			},
			{
				name: "Node.js",
			},
			{
				name: "Express.js",
			},
			{
				name: "MySQL",
			},
			{
				name: "Redis",
			},
			{
				name: "Linux",
			},
			{
				name: "HTML5",
			},
		],
	},
	{
		position: "right",
		company_name: "I+D+I PUE",
		company_url: "https://pue.es/",
		work_description:
			"Additionally, I have taken on the position of Researcher in Research, Development, and Innovation (I+D+I), contributing to the exploration of new technologies and methodologies to enhance our projects and stay at the forefront of innovation. I continue to fulfill the role of Full-stack and Systems Administrator.",
		technologies: [
			{
				name: "Kubernetes",
			},
			{
				name: "AWS",
			},
			{
				name: "Docker",
			},
			{
				name: "Python",
			},
			{
				name: "Node.js",
			},
			{
				name: "Express.js",
			},
			{
				name: "MySQL",
			},
			{
				name: "Redis",
			},
			{
				name: "Linux",
			},
			{
				name: "HTML5",
			},
		],
	},
];

module.exports = function routes(log, whatsApp) {
	const router = require("express").Router();

	const contact = require("./contact")(log, whatsApp);

	router.get("/", async function (req, res) {
		log.info("PATH: /");
		res.render("index", { workData: workData });
	});

	router.use("/", contact);

	return router;
};
