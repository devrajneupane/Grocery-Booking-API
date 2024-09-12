import { Router } from "express";
import { requestHandler } from "../utils/requestWrapper";
import * as controller from "../controller/userController";

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
 *            example:
 *              message: User created succesfully
 *      409:
 *        description: Conflict - email already exists
 *        content:
 *          application/json:
 *            example:
 *              message: User with same email already exists
 */
router.post("/", requestHandler([controller.createUser]));

export default router;
