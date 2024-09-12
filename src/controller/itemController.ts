import { UUID } from "crypto";

import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { loggerWithNameSpace } from "../utils";
import { ItemService } from "../service/itemService";
import { IRequest, IGetUserQuery } from "../interface";

const logger = loggerWithNameSpace(__filename);

/**
 * Get Item details for given item id
 *
 * @param req Request Object
 * @param res Response Object
 * @returns HTTP Response
 */
export async function getItem(req: IRequest, res: Response) {
  const id = +req.params.id;

  logger.info(`Getting information for item ${id}`);
  const serviceData = await ItemService.getItemById(id);

  logger.info(`Retrived information for item ${id}`);

  res.status(StatusCodes.OK).json(serviceData);
}

/**
 * Get all items
 *
 * @param req Request Object with query parameters
 * @param res Response Object
 * @returns HTTP Response
 */
export async function getItems(req: IRequest, res: Response) {
  const userId = req.user?.id as UUID;
  const query = req.query as IGetUserQuery;
  logger.info(`Getting all items for user ${req.user?.id}`);

  const serviceData = await ItemService.getItems(userId, query);
  logger.info(`Retrived all items for user ${req.user?.id} successfully`);

  res.status(StatusCodes.OK).json(serviceData);
}

/**
 * Create a new item to start conversation with model
 *
 * @param req Request Object
 * @param res Respons Object
 * @returns HTTP Response
 */
export async function createItems(req: IRequest, res: Response) {
  const { body } = req;
  logger.info(`Creating new items`);

  const serviceData = await ItemService.createItems(body);
  logger.info(
    `Following items created successfully\n${serviceData.createdItems}`,
  );

  res.status(StatusCodes.CREATED).json(serviceData);
}

/**
 * Update item by given id
 *
 * @param req Request Object
 * @param res Response Object
 * @returns HTTP Response
 */
export async function updateItem(req: IRequest, res: Response) {
  const id = +req.params?.id;
  const { body } = req;

  logger.info(`Updating item ${id}`);
  const serviceData = await ItemService.updateItem(id, body);
  logger.info(`Item ${id} updated successfully`);

  res.status(StatusCodes.OK).json(serviceData);
}

/**
 * Delete Item by given id
 *
 * @param req Request Object
 * @param res Response Object
 * @returns HTTP Response
 */
export async function deleteItem(req: IRequest, res: Response) {
  const id = +req.params.id;
  logger.info(`Deleting item ${id}`);

  const serviceData = await ItemService.deleteItem(id);
  logger.info(`Item ${id} deleted successfully`);

  res.status(StatusCodes.OK).json(serviceData);
}
