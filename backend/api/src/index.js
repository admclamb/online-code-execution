import app from "./app";
import Config from "./config";

const config = Config.getConfig();

const [address, port] = config.bindAddress.split(":");

const server = app.listen(port, address, () => {
  logger.inf("API server started on", config.bindAddress);
});

process.on("SIGTERM", () => {
  server.close();
  process.exit(0);
});
