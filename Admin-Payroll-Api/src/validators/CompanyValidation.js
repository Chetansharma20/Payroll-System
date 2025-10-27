import Joi from "joi";

 const CompanyValidation = Joi.object({
  CompanyEmail: Joi.string().email().required(),
  CompanyName: Joi.string().min(3).max(50).required(),
  CompanyAddress: Joi.string().min(5).required(),
  // RegistrationNo: Joi.string().alphanum().required(),
  CompanyCity: Joi.string().required(),
  CompanyState: Joi.string().required(),
  CompanyPassword: Joi.string().min(6).required(),
});
export { CompanyValidation }