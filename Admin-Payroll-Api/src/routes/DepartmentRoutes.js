import express from "express";
// import { AddBank, FetchBank } from "../controller/BankController.js";
import { AddDepartment, FetchDepartment, FetchDepartmentByCompany } from "../controller/DepartmentController.js";

let DepartmnetRouter = express.Router()

DepartmnetRouter.get("/fetchdepartment", FetchDepartment)
DepartmnetRouter.post("/adddepartment", AddDepartment)
DepartmnetRouter.post("/fetchdepartmentbycompany", FetchDepartmentByCompany)

export{DepartmnetRouter}