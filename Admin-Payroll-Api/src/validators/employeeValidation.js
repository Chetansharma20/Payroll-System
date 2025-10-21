import Joi from "joi";

 const employeeValidaton = Joi.object({
  EmployeeName: Joi.string().min(3).max(50).required(),
  EmployeeEmail: Joi.string().email().required(),
  EmployeePhoneNo: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({ "string.pattern.base": "Phone number must be 10 digits" }),
  EmployeeAddress: Joi.string().min(5).required(),
  EmployeeCity: Joi.string().required(),
  EmployeeState: Joi.string().required(),
  EmployeePincode: Joi.number().integer().min(100000).max(999999).required(),
  EmployeeGender: Joi.string()
    .valid("Male", "Female", "Others")
    .required(),
  EmployeePassword: Joi.string().min(6).max(50).required(),
  EmployeeDOB: Joi.date().required(),
  EmployeeJoiningDate: Joi.date().required(),
  EmployeeDesignation: Joi.string().required(),
  EmployeeDepartment: Joi.string().required(),
  EmployeeType: Joi.string().required(),
  BranchId: Joi.string().optional(),
  CompanyId: Joi.string().optional(),
  BranchName: Joi.string().optional(),
  EmployeePhoto: Joi.string().uri().optional(),
  AdhaarCard: Joi.string().uri().optional(),
  PanCard: Joi.string().uri().optional(),
  PassBook: Joi.string().uri().optional(),
  Degree: Joi.string().uri().optional(),
});
export {employeeValidaton}