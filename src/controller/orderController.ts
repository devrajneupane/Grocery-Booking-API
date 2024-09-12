import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IRequest } from "../interface";
import { OrderService } from "../service/orderService";
import { loggerWithNameSpace } from "../utils";
import { UUID } from "crypto";

const logger = loggerWithNameSpace(__filename);

/**
 * Create a new item to start conversation with model
 *
 * @param req Request Object
 * @param res Respons Object
 * @returns HTTP Response
 */
export async function createItems(req: IRequest, res: Response) {
  const userId = req.user?.id as UUID;
  const { body } = req;

  logger.info(`Creating new orders`);
  const serviceData = await OrderService.createOrders(userId, body);

  logger.info(`Following items ordered successfully\n${serviceData}`);

  res.status(StatusCodes.CREATED).json(serviceData);
}
