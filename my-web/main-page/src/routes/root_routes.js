const axios = require("axios");

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

	const reCaptchaMiddleware = async function (req, res, next) {
		const token = req.body["g-recaptcha-response"];

		if (!token) {
			return res.status(400).json({
				success: false,
				message: "reCAPTCHA token is missing",
			});
		}

		try {
			const response = await axios.post(
				`https://www.google.com/recaptcha/api/siteverify`,
				null,
				{
					params: {
						secret: process.env.RECAPTCHA_SECRET_KEY,
						response: token,
						remoteip: req.ip, // Opcional: dirección IP del usuario
					},
				}
			);

			const data = response.data;

			if (data.success) {
				// Aquí puedes manejar el envío del formulario si el reCAPTCHA es válido

				next();
			} else {
				res.status(400).json({
					success: false,
					message: "reCAPTCHA verification failed",
					errorCodes: data["error-codes"],
				});
			}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Error verifying reCAPTCHA",
				error: error.message,
			});
		}
	};

	router.get("/", async function (req, res) {
		log.info("PATH: /");
		res.render("index", { workData: workData });
	});

	router.post("/contact", reCaptchaMiddleware, async function (req, res) {
		log.info("PATH: /contact");

		const { name, email, message } = req.body;

		if (!name || !email || !message) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		const messageToSend = `Hey,\n\nHa llegado un nuevo mensaje de *${name} (${email})*:\n> ${message}`;

		whatsApp.sendMessage(messageToSend);

		res.status(200).send("DONE");
	});

	router.all("/*", (req, res) => {
		res.redirect("/");
	});

	return router;
};
