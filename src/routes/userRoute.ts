import { Router } from "express";
import { requestHandler } from "../utils/requestWrapper";
import * as controller from "../controller/userController";

const router = Router();

router.post("/", requestHandler([controller.createUser]));

export default router;
