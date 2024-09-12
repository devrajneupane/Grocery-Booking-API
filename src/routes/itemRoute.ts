import { Router } from "express";

import * as controller from "../controller/itemController";
import { ROLE } from "../enums";
import { authenticate, authorize } from "../middleware/auth";
import * as validator from "../middleware/validator";
import * as schema from "../schema";
import { requestHandler } from "../utils";

const router = Router();

router.get(
  "/",
  requestHandler([
    authenticate,
    authorize([ROLE.ADMIN, ROLE.USER]),
    validator.validateReqQuery(schema.userReqQuerySchema),
    controller.getItems,
  ]),
);

router.get(
  "/:id",
  requestHandler([
    authenticate,
    authorize([ROLE.ADMIN, ROLE.USER]),
    validator.validateReqParams(schema.userReqParamSchema),
    controller.getItem,
  ]),
);

router.post(
  "/",
  requestHandler([
    authenticate,
    authorize([ROLE.ADMIN]),
    controller.createItems,
  ]),
);

router.patch(
  "/:id",
  requestHandler([
    authenticate,
    authorize([ROLE.ADMIN]),
    validator.validateReqBody(schema.updateItemBodySchema),
    controller.updateItem,
  ]),
);

router.delete(
  "/:id",
  requestHandler([
    authenticate,
    authorize([ROLE.ADMIN]),
    validator.validateReqParams(schema.userReqParamSchema),
    controller.deleteItem,
  ]),
);

export default router;
