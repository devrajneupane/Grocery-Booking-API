import Joi from "joi";

// Schema for order create request body
export const createOrderBodySchema = Joi.array()
  .items(
    Joi.object({
      itemId: Joi.number().required().messages({
        "number.base": "Item ID must be a number",
        "any.required": "Item ID is required",
      }),
      quantity: Joi.number().required().messages({
        "number.base": "Quantity must be a number",
        "any.required": "Quantity is required",
      }),
    }),
  )
  .min(1)
  .messages({
    "array.min": "Order must contain at least one item",
  })
  .options({
    stripUnknown: true,
  });
