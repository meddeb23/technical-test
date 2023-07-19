import Joi from "joi";

export default class ReqValidation {
  static validateName = Joi.string().min(3).required();
  static addProduct = Joi.object({
    quantity: Joi.number().positive().required(),
    name: Joi.string().min(3).required(),
    unitPrice: Joi.number().positive().required(),
  });
}
