import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { loggerWithNameSpace } from "../utils";
import swaggerDocs from "../utils/swagger";
import authRouter from "./authRoute";
import itemRouter from "./itemRoute";
import orderRouter from "./orderRoute";
import userRouter from "./userRoute";

const router = Router();
const logger = loggerWithNameSpace(__filename);

/**
 * @openapi
 * /healthcheck:
 *   get:
 *    summary: Check if the app is running
 *    tags: ['Health']
 *    security: []
 *    responses:
 *      200:
 *        description: Current status of the app
 *        content:
 *          application/json:
 *            example:
 *              message: App is running
 */
router.get("/healthcheck", (_, res) => {
  logger.info("App is running");
  res.status(StatusCodes.OK).send({
    message: "App is running",
  });
});

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use("/orders", orderRouter);
router.use("/", authRouter);

// Add route for Swagger UI
swaggerDocs(router);

export default router;
