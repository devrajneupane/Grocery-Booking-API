import Joi from "joi";

// Schema for auth request body
export const createAuthSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be provided",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be provided",
  }),
});
