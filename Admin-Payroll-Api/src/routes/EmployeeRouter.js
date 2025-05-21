import express from "express"
import { AddEmployee, DeleteEmployee, fetchEmployee, getEmployeeByCompany, UpdateEmployee } from "../controller/EmployeeController.js"
import { Upload } from "../MiddleWare/FileUploadMiddleWare.js"



let EmployeeRouter = express.Router()



EmployeeRouter.get("/fetchemployee", fetchEmployee)
EmployeeRouter.post("/addemployee",Upload.single("EmployeePhoto"), AddEmployee)
EmployeeRouter.put("/updateemployee", UpdateEmployee)
EmployeeRouter.delete("/deleteemployee", DeleteEmployee)
EmployeeRouter.post("/getemployeebycompany", getEmployeeByCompany)
export {EmployeeRouter}