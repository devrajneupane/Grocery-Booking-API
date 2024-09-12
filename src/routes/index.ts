import express from "express";
import { StatusCodes } from "http-status-codes";

import userRouter from "./userRoute";
import authRouter from "./authRoute";
import itemRouter from "./itemRoute";
import orderRouter from "./orderRoute";

import { loggerWithNameSpace } from "../utils";

const router = express();
const logger = loggerWithNameSpace(__filename);

router.get("/", (_, res) => {
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
