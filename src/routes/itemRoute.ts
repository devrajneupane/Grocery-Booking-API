import { Router } from "express";

import * as controller from "../controller/itemController";
import { ROLE } from "../enums";
import { authenticate, authorize } from "../middleware/auth";
import * as validator from "../middleware/validator";
import * as schema from "../schema";
import { requestHandler } from "../utils";

const router = Router();

/**
 * @openapi
 * /items:
 *   get:
 *     summary: Retrieve a list of items
 *     description: Get a list of items. For regular users, only items with quantity in stock > 0 are shown. For admins, all items are shown regardless of stock. Supports pagination and search.
 *     tags: ['Items']
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: Search query string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: false
 *         description: Page number for pagination
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         required: false
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All items retrieved successfully
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: chocolate
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: have fun with this delicious chocolate
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 20
 *                       quantityInStock:
 *                         type: integer
 *                         example: 100
 *                       lastUpdated:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-11T02:46:49.244Z"
 *       400:
 *         description: Bad request - Invalid path parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: id must be a number
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
router.get(
  "/",
  requestHandler([
    authenticate,
    authorize([ROLE.ADMIN, ROLE.USER]),
    validator.validateReqQuery(schema.itemReqQuerySchema),
    controller.getItems,
  ]),
);

/**
 * @openapi
 * /items/{id}:
 *   get:
 *     summary: Retrieve item details
 *     description: Get detailed information about a specific item by its ID.
 *     tags: ['Items']
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved item details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item retrieved successfully
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 10
 *                     name:
 *                       type: string
 *                       example: "chocolate"
 *                     description:
 *                       type: string
 *                       nullable: true
 *                       example: "everyday chocolate"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 20
 *                     quantityInStock:
 *                       type: integer
 *                       example: 100
 *                     lastUpdated:
 *                       type: string
 *                       format: date-time
 *                       example: "2224-19-11T02:46:49.244Z"
 *       400:
 *         description: Bad request - Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: page must be a positive number
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
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item with id 10 does not exists
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
router.get(
  "/:id",
  requestHandler([
    authenticate,
    authorize([ROLE.ADMIN, ROLE.USER]),
    validator.validateReqParams(schema.itemReqParamSchema),
    controller.getItem,
  ]),
);

/**
 * @openapi
 * /items:
 *   post:
 *     summary: Create single or multiple items
 *     description: Endpoint to create multiple items in a single request. only admin can perform this request
 *     tags: ['Items']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *                 - price
 *                 - quantityInStock
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the item
 *                   example: "biscuit"
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: The price of the item
 *                   example: 190
 *                 quantityInStock:
 *                   type: integer
 *                   minimum: 0
 *                   description: The quantity of the item in stock
 *                   example: 1000
 *     responses:
 *       201:
 *         description: items created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: items created successfully
 *                 createditems:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 12
 *                       name:
 *                         type: string
 *                         example: biscuit
 *                       description:
 *                         type: string
 *                         example: Golden-baked and crisp, made with the finest ingredients for a delicious snack
 *                       price:
 *                         type: number
 *                         example: 50
 *                       quantityInStock:
 *                         type: number
 *                         example: 100
 *                       lastUpdated:
 *                         type: date
 *                         example: 2024-09-11T00:00:00.000Z
 *       400:
 *         description: Bad request - Inavlid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: quantityInStock is required
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
 *       403:
 *         description: Forbidden - User is not allowed to perform this request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User 7d9cfefa-2dc2-4ca7-b968-87862c34225c is not authorized
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
    authorize([ROLE.ADMIN]),
    validator.validateReqBody(schema.createItemBodySchema),
    controller.createItems,
  ]),
);

/**
 * @openapi
 * /items/{id}:
 *   patch:
 *     summary: Update an item
 *     description: Update one or more fields of an existing item. only admin can perform this request
 *     tags: ['Items']
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the item
 *                 example: "sugar"
 *               description:
 *                 type: string
 *                 description: The updated description of the item
 *                 example: Pure, fine crystals for perfect sweetness in every dish.
 *               quantityInStock:
 *                 type: integer
 *                 minimum: 0
 *                 description: The updated quantity of the item in stock
 *                 example: 10
 *               price:
 *                 type: number
 *                 format: float
 *                 minimum: 1
 *                 description: The updated price of the item
 *                 example: 100
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item updated successfully
 *                 updatedItem:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 4
 *                     name:
 *                       type: string
 *                       example: sugar
 *                     description:
 *                       type: string
 *                       example: Pure, fine crystals for perfect sweetness in every dish.
 *                     quantityInStock:
 *                       type: integer
 *                       example: 10
 *                     price:
 *                       type: number
 *                       example: 100
 *       400:
 *         description: Bad Request - Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: At least one field must be updated
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
 *       403:
 *         description: Forbidden - User is not allowed to perform this request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User 7d9cfefa-2dc2-4ca7-b968-87862c34225c is not authorized
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item with id 4 does not exist
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
router.patch(
  "/:id",
  requestHandler([
    authenticate,
    authorize([ROLE.ADMIN]),
    validator.validateReqBody(schema.updateItemBodySchema),
    controller.updateItem,
  ]),
);

/**
 * @openapi
 * /items/{id}:
 *   delete:
 *     summary: Delete an item
 *     description: Remove a item from the database based on its ID. only admin can perform this request
 *     tags: ['Items']
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: 4
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item deleted successfully
 *                 deletedItem:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 4
 *                     name:
 *                       type: string
 *                       example: sugar
 *                     description:
 *                       type: string
 *                       example: Pure, fine crystals for perfect sweetness in every dish.
 *                     quantityInStock:
 *                       type: integer
 *                       example: 10
 *                     price:
 *                       type: number
 *                       example: 100
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
 *       403:
 *         description: Forbidden - User is not allowed to perform this request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User 7d9cfefa-2dc2-4ca7-b968-87862c34225c is not authorized
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item with id 4 does not exists
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
router.delete(
  "/:id",
  requestHandler([
    authenticate,
    authorize([ROLE.ADMIN]),
    validator.validateReqParams(schema.itemReqParamSchema),
    controller.deleteItem,
  ]),
);

export default router;
