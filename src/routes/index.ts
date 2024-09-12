import express from "express";
import { StatusCodes } from "http-status-codes";

import userRouter from "./userRoute";
import authRouter from "./authRoute";

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
router.use("/", authRouter);

export default router;
