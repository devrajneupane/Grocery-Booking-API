import Joi from "joi";

// Schema for create request body
export const createItemBodySchema = Joi.array()
  .items({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    price: Joi.number().required().messages({
      "any.required": "Price is required",
    }),
    quantityInStock: Joi.number().required().messages({
      "any.required": "quantityInStock is required",
    }),
  })
  .options({
    stripUnknown: true,
  });

// Schema for update request body
export const updateItemBodySchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.base": "Name must be a string",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string",
  }),
  price: Joi.number().optional().messages({
    "number.base": "Price must be a number",
  }),
  quantityInStock: Joi.number().optional().messages({
    "number.base": "Quantity in stock must be a number",
  }),
  id: Joi.forbidden().messages({
    "any.forbidden": "Id can't be updated",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be updated",
  })
  .options({
    stripUnknown: true,
  });

// Schema for query parameters
export const itemReqQuerySchema = Joi.object({
  q: Joi.string().optional().messages({
    "string.base": "Search query must be a string",
  }),
  page: Joi.number().integer().positive().optional().messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be an integer",
    "number.positive": "Page must be a positive number",
  }),
  size: Joi.number().integer().positive().optional().messages({
    "number.base": "Size must be a number",
    "number.integer": "Size must be an integer",
    "number.positive": "Size must be a positive number",
  }),
}).options({
  stripUnknown: true,
});

// Schema for path parameters
export const itemReqParamSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number.",
    "number.integer": "ID must be an integer.",
    "number.positive": "ID must be a positive number.",
  }),
}).options({
  stripUnknown: true,
  allowUnknown: false,
});
