import express from "express";
import Logger from "logplease";
const logger = Logger.create("config");

const app = express();

logger.info("Setting loglevel to", config.log_level);
Logger.setLogLevel(config.log_level);

app.get("/", (req, res) => {
  res.status(200).json({ data: "WELCOME" });
});

export default app;
