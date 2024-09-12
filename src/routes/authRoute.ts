import { Router } from "express";

import { createAuthSchema } from "../schema";
import { requestHandler } from "../utils/requestWrapper";
import { validateReqBody } from "../middleware/validator";
import { login, refresh } from "../controller/authController";

const router = Router();

/**
 * @openapi
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with their email and password.
 *     tags: ['Auth']
 *     security: []
 *     requestBody:
 *       description: The user's email and password for authentication.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: user@1234
 *     responses:
 *       200:
 *         description: Successfully authenticated the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Authentication token.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3YTRiNzgwLTJkMWItNGE1My1iZjgyLTYyYTRlY2RiMzExZiIsIm5hbWUiOiJib2IiLCJlbWFpbCI6ImJvYkBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjYyNDkyMDcsImV4cCI6MTcyOTI0OTIwN30.X328bTJesm_anysOiC6LktMoOLbfXYNCgLr23sqdwaI
 *       403:
 *         description: Forbidden - Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
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
  "/login",
  requestHandler([validateReqBody(createAuthSchema), login]),
);
router.get("/refresh", requestHandler([refresh]));

export default router;
