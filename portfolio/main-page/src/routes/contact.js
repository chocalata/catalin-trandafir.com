const axios = require("axios");

module.exports = function routes(log, whatsApp) {
  const router = require("express").Router();

  const reCaptchaMiddleware = async function (req, res, next) {
    const token = req.body["g-recaptcha-response"];

    if (!token) {
      log.error("reCAPTCHA token is missing");

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
            remoteip: req.ip,
          },
        },
      );

      const data = response.data;

      if (data.success && data.score >= 0.5) {
        log.info("reCAPTCHA verification successful");
        log.info(data);
        next();
      } else {
        log.error("reCAPTCHA verification failed");
        log.error(data);

        return res.status(200).json({
          success: false,
          message:
            "Parece que tu solicitud fue detectada como sospechosa. ¿Podrías intentarlo otra vez?",
          errorCodes: data["error-codes"],
        });
      }
    } catch (error) {
      log.error("Error verifying reCAPTCHA");
      log.error(error);

      return res.status(500).json({
        success: false,
        message: "Error verifying reCAPTCHA",
        error: error.message,
      });
    }
  };

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

    res.status(200).json({
      success: true,
      message: "DONE",
    });
  });

  return router;
};
