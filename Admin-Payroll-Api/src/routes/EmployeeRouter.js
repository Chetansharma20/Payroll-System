import express from "express";
import { AddEmployee, DeleteEmployee, EmployeeLogin, fetchEmployee, getEmployeeByCompany, UpdateEmployee } from "../controller/EmployeeController.js";
import { Upload } from "../MiddleWare/FileUploadMiddleWare.js";
import { verifyToken, verifyRole } from "../MiddleWare/auth.js";

const EmployeeRouter = express.Router();

// File upload configuration
const employeeUploadFields = Upload.fields([
  { name: "EmployeePhoto", maxCount: 1 },
  { name: "AdhaarCard", maxCount: 1 },
  { name: "PanCard", maxCount: 1 },
  { name: "Degree", maxCount: 1 },
  { name: "PassBook", maxCount: 1 },
]);

// -------------------- Public Routes --------------------
// Employee login
EmployeeRouter.post("/employeelogin", EmployeeLogin);

// Add employee (usually Company adds employees)
EmployeeRouter.post(
  "/addemployee",
  verifyToken,
  verifyRole(["Company"]),
  employeeUploadFields,
  AddEmployee
);

// -------------------- Protected Routes --------------------
// Fetch all employees (Company or Employee can view)
EmployeeRouter.get(
  "/fetchemployee",
  verifyToken,
  verifyRole(["Company", "Employee"]),
  fetchEmployee
);

// Update employee (Employee can update self, Company can update any employee)
EmployeeRouter.put(
  "/updateemployee",
  verifyToken,
  verifyRole(["Company", "Employee"]),
  employeeUploadFields,
  UpdateEmployee
);

// Delete employee (only Company can delete)
EmployeeRouter.delete(
  "/deleteemployee",
  verifyToken,
  verifyRole(["Company"]),
  DeleteEmployee
);

// Get employees by company (only Company)
EmployeeRouter.post(
  "/getemployeebycompany",
  verifyToken,
  verifyRole(["Company"]),
  getEmployeeByCompany
);

export { EmployeeRouter };
