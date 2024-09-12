import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IRequest } from "../interface";
import { loggerWithNameSpace } from "../utils";
import { UserService } from "../service/userService";

const logger = loggerWithNameSpace(__filename);

/**
 * Create new user
 *
 * @param {IRequest} req Request
 * @param {Response} res Response
 */
export async function createUser(req: IRequest, res: Response) {
  const { body } = req;
  logger.info(`Creating new user ${body.name}`);

  const serviceData = await UserService.createUser(body);
  logger.info(`User ${body.name} created successfully`);

  res.status(StatusCodes.CREATED).json(serviceData);
}
