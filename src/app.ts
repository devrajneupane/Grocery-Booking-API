import express from "express";

import { env } from "./config";
import {
  genericErrorHandler,
  notFoundError,
  requestLogger,
} from "./middleware";
import router from "./routes";
import { loggerWithNameSpace } from "./utils";

const logger = loggerWithNameSpace(__filename);

const app = express();
const port = env.port!;

// Middleware to parse JSON bodies
app.use(
  express.json({
    strict: true, // Enforces strict JSON parsing, preventing trailing commas
  }),
);

// Middleware to log incoming requests
app.use(requestLogger);

// Middleware to handle all routes
app.use(router);

// Middleware to handle not found routes
app.use(notFoundError);

// Middleware to handle generic errors
app.use(genericErrorHandler);

// Start the server
app.listen(port, () => {
  logger.info(`Server started listening on port: ${port}`);
  logger.info(`Docs available at http://localhost:${port}/docs`);
});
