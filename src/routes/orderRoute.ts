import { Router } from "express";

import * as controller from "../controller/orderController";
import { ROLE } from "../enums";
import { authenticate, authorize } from "../middleware/auth";
import * as validator from "../middleware/validator";
import * as schema from "../schema";
import { requestHandler } from "../utils";

const router = Router();

router.post(
  "/",
  requestHandler([
    authenticate,
    authorize([ROLE.ADMIN, ROLE.USER]),
    validator.validateReqBody(schema.createOrderBodySchema),
    controller.createItems,
  ]),
);

export default router;
