import Joi from "joi";

export const createOrderBodySchema = Joi.array()
  .items({
    itemId: Joi.number().required().messages({
      "itemId.number": "Item id must be a number",
    }),
    quantity: Joi.number().required().messages({
      "quantity.number": "Quantity must be a number",
    }),
  })
  .options({
    stripUnknown: true,
  });
