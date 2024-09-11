import { NextFunction, Response } from "express";

import { IRequest } from "../interface";
import { loggerWithNameSpace } from "../utils";

const logger = loggerWithNameSpace(__filename);

/**
 * Middleware to log all incoming requests
 *
 * @param req Request Object
 * @param res Response Object
 * @param next Next function
 */
export function requestLogger(
  req: IRequest,
  res: Response,
  next: NextFunction,
) {
  logger.info(`${req.method}: ${req.url}`);

  next();
}
