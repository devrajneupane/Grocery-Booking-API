import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import { env } from "../config";
import { ROLE } from "../enums";
import { UnauthenticatedError, UnauthorizedError } from "../error";
import { IRequest, IUser } from "../interface";
import { loggerWithNameSpace } from "../utils";

const logger = loggerWithNameSpace(__filename);

/**
 * Middleware to check if user is authenticated
 *
 * @param req Request
 * @param res Response
 * @param next Next function
 * @throws UnauthenticatedError
 */
export function authenticate(req: IRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthenticatedError("Token Not Found");
  }

  const token = authorization.split(" ");
  logger.debug(token);

  if (token.length !== 2 || token[0] !== "Bearer") {
    logger.warn("Invalid Token");
    throw new Error("Invalid Token");
  }

  verify(token[1], env.jwt.secret!, (error, data) => {
    if (error) {
      throw new UnauthenticatedError(error.message);
    }

    if (typeof data !== "string" && data) {
      req.user = data as Omit<IUser, "password">;
    }
  });
}

/**
 * Middleware to check if user is authorized
 *
 * @param roles Permission to check
 * @returns Middleware
 * @throws UnauthorizedError
 */
export function authorize(roles: ROLE[]) {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    const role = user?.role;

    if (!roles.includes(role!)) {
      throw new UnauthorizedError(`User ${user?.id} is not authorized`);
    }
    logger.info("Authorized " + role);
  };
}
