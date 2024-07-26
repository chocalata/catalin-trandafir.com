/**
 * This is the class that will handle the WhatsApp API
 */
const { Client, LocalAuth } = require("whatsapp-web.js");
const QRCode = require("qrcode");

const path = require("path");

const WHATSAPP_CHAT_WEB_CONTACT = process.env.WHATSAPP_CHAT_WEB_CONTACT;

class WhatsAppController {
	#client;
	#log;
	#clientIsReady = false;
	constructor(log) {
		const client = new Client({
			puppeteer: {
				args: [
					"--no-sandbox",
					"--disable-setuid-sandbox",
					"--disable-extensions",
				],
				headless: true,
			},
			authStrategy: new LocalAuth({
				dataPath: path.join(__dirname, "../whatsapp-data/"),
			}),
			webVersionCache: {
				type: "local",
				path: path.join(__dirname, "../whatsapp-data/cache/"),
			},
		});

		client.initialize();

		client.on("qr", (qr) => {
			log.info(`QR RECEIVED: ${qr}`);
			QRCode.toString(qr, { type: "terminal" }, function (err, url) {
				console.log(url);
			});
		});

		client.on("ready", () => {
			log.info("CLIENT IS READY!");
			this.#clientIsReady = true;

			this.sendMessage("Whatsapp client ready!");
		});

		this.#client = client;
		this.#log = log;
	}

	sendMessage(message) {
		if (!this.#clientIsReady) {
			this.#log.error("Client is not ready yet!");
			return false;
		}
		this.#client.getChatById(WHATSAPP_CHAT_WEB_CONTACT).then((chat) => {
			chat.sendMessage(message).then((msg) => {
				this.#log.info(`Message sent: ${msg.body}`);
			});
		});
	}
}

module.exports = WhatsAppController;
