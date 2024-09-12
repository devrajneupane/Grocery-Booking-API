import { Router } from "express";

import * as controller from "../controller/orderController";
import { ROLE } from "../enums";
import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody } from "../middleware/validator";
import { createOrderBodySchema } from "../schema";
import { requestHandler } from "../utils";

const router = Router();

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Order one or multiple items
 *     description: Receives a list of items with their quantities to process.
 *     tags: ['Orders']
 *     requestBody:
 *       description: List of items with their quantities to be ordered.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 itemId:
 *                   type: integer
 *                   description: ID of the item.
 *                   minimum: 1
 *                   example: 3
 *                 quantity:
 *                   type: integer
 *                   description: Quantity of the item.
 *                   minimum: 1
 *                   example: 10
 *     responses:
 *       200:
 *         description: Successfully ordered items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Items ordered successfully
 *                 items:
 *                   type: array
 *                   orderedItems:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: 752f43eb-1a00-48c1-b0b5-701b18f9a874
 *                       itemId:
 *                         type: number
 *                         example: 5
 *                       quantity:
 *                         type: number
 *                         example: 10
 *                       orderBy:
 *                         type: string
 *                         format: uuid
 *                         example: 7d9cfefa-2dc2-4ca7-b968-87862c34225c
 *                       orderedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-11T02:46:49.244Z"
 *       400:
 *         description: Bad request - Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: value must be an array
 *       401:
 *         description: Unauthorised - User is not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token Not Found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post(
  "/",
  requestHandler([
    authenticate,
    authorize([ROLE.ADMIN, ROLE.USER]),
    validateReqBody(createOrderBodySchema),
    requestHandler([controller.createItems]),
  ]),
);

export default router;
