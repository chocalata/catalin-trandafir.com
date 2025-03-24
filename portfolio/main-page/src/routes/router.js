const experienceData = require("../data/experienceData");

module.exports = function routes(log, whatsApp) {
  const router = require("express").Router();

  const contact = require("./contact")(log, whatsApp);

  router.get("/", async function (req, res) {
    log.info("PATH: /");
    res.render("index", {
      workData: experienceData.workData,
      projectData: experienceData.projectData,
    });
  });

  router.use("/", contact);

  return router;
};
