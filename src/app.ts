import express from "express";

import router from "./routes";
import { env } from "./config";
import { requestLogger } from "./middleware";
import { loggerWithNameSpace } from "./utils";
import { genericErrorHandler, notFoundError } from "./middleware";

const logger = loggerWithNameSpace(__filename);

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log incoming requests
app.use(requestLogger);

// Middleware to handle all routes
app.use(router);

// Middleware to handle not found routes
app.use(notFoundError);

// Middleware to handle generic errors
app.use(genericErrorHandler);

// Start the server
app.listen(env.port, () => {
  logger.info(`Server started listening on port: ${env.port}`);
});
