import { Server } from "http";
import app from "./app";
import { errorlogger, logger } from "./app/src/shared/logger";
import dotenv from "dotenv"

dotenv.config();
let server: Server;

async function main() {
  try {
    server = app.listen(process.env.PORT, () => {
      console.log(`app is listening on port ${process.env.PORT}`);
      logger.info(`app is listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    errorlogger.error(err);
  }
}


main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  errorlogger.error(err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  errorlogger.error("uncaughtException is detected");
  process.exit(1);
});


// docker run -p 5000:5000 --name ts-container -v ts-docker-logs://app/logs -w //app -v "$(cwd)"://app -v //app/node_modules --rm ts-docker:v2