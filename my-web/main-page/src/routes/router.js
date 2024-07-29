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

/*
<div class="project-card">
	<img class="project-image" src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Project Image">
	<h2>Project Title</h2>
	<p>Brief description of the project goes here. Explain the key features and technologies used.</p>
	<div class="tech-stack">
		<span class="tech-item">Tech 1</span>
		<span class="tech-item">Tech 2</span>
		<span class="tech-item">Tech 3</span>
	</div>
</div>
*/
projectData = [
	{
		title: "Apolo X",
		description:
			"This was my first project. It's a videogame with a single player and multiplayer mode. Made as a final project for the course with Alberto Gutierro.",
		github: "https://github.com/Alberto-Gutierro/Catalin_Alberto-Juego_Naves",
		image: "/img/projects/ApoloX.png",
		technologies: [
			{
				name: "Java",
			},
		],
	},
	{
		title: "Project 2",
		description: "This is the second project description.",
		github: "https://github.com/Alberto-Gutierro/Catalin_Alberto-Juego_Naves",

		image: "/img/tech/HTML5.svg",
		technologies: [
			{
				name: "Java",
			},
			{
				name: "HTML5",
			},
			{
				name: "Node.js",
			},
			{
				name: "Node.js",
			},
			{
				name: "Node.js",
			},
		],
	},
	{
		title: "Project 3",
		description: "This is the third project description.",
		github: "https://github.com/Alberto-Gutierro/Catalin_Alberto-Juego_Naves",

		image: "/img/tech/Node.js.svg",
		technologies: [
			{
				name: "Java",
			},
			{
				name: "HTML5",
			},
			{
				name: "Node.js",
			},
			{
				name: "Node.js",
			},
			{
				name: "Node.js",
			},
		],
	},
];

module.exports = function routes(log, whatsApp) {
	const router = require("express").Router();

	const contact = require("./contact")(log, whatsApp);

	router.get("/", async function (req, res) {
		log.info("PATH: /");
		res.render("index", { workData: workData, projectData: projectData });
	});

	router.use("/", contact);

	return router;
};
