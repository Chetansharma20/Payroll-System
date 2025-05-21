import express from "express";
// import { AddBank, FetchBank } from "../controller/BankController.js";
import { AddDepartment, FetchDepartment, FetchDepartmentByCompany } from "../controller/DepartmentController.js";
import { AddDesignation, FetchDesignation, FetchDesignationByCompany } from "../controller/DesignationController.js";

let DesignationRouter = express.Router()

DesignationRouter.get("/fetchdesignation", FetchDesignation)
DesignationRouter.post("/adddesignation", AddDesignation)
DesignationRouter.post("/fetchdesignationbycompany", FetchDesignationByCompany)

export{DesignationRouter}