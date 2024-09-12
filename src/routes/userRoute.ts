import { Router } from "express";

import * as controller from "../controller/userController";
import { validateReqBody } from "../middleware/validator";
import { createUserBodySchema } from "../schema";
import { requestHandler } from "../utils/requestWrapper";

const router = Router();

/**
 * @openapi
 * /users:
 *   post:
 *    summary: Create a new user
 *    description: This endpoint allows to create a new user with unique email.
 *    tags: ['Users']
 *    security: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                description: User's name
 *              email:
 *                type: string
 *                format: email
 *                description: User's email address (must be unique)
 *              password:
 *                type: string
 *                format: password
 *                description: User's password (min 8 characters)
 *    responses:
 *      201:
 *        description: User created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: User created successfully
 *      409:
 *        description: Conflict - email already exists
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: User with same email already exists
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.post(
  "/",
  requestHandler([
    validateReqBody(createUserBodySchema),
    controller.createUser,
  ]),
);

export default router;
