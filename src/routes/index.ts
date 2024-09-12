import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import userRouter from "./userRoute";
import authRouter from "./authRoute";
import itemRouter from "./itemRoute";
import orderRouter from "./orderRoute";

import { loggerWithNameSpace } from "../utils";

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

export default router;
