import express from "express"
import { AddEmployee, DeleteEmployee, EmployeeLogin, fetchEmployee, getEmployeeByCompany, UpdateEmployee } from "../controller/EmployeeController.js"
import { Upload } from "../MiddleWare/FileUploadMiddleWare.js"

const employeeUploadFields = Upload.fields([
 {name: 'EmployeePhoto', maxCount: 1},
 {name: 'AdhaarCard', maxCount: 1},
{name: 'PanCard', maxCount: 1},
{name: 'Degree', maxCount: 1},
 {name: 'PassBook', maxCount: 1}
])

let EmployeeRouter = express.Router()



EmployeeRouter.get("/fetchemployee", fetchEmployee)
EmployeeRouter.post("/addemployee", employeeUploadFields, AddEmployee)
EmployeeRouter.put("/updateemployee", employeeUploadFields, UpdateEmployee)
EmployeeRouter.delete("/deleteemployee", DeleteEmployee)
EmployeeRouter.post("/getemployeebycompany", getEmployeeByCompany)
EmployeeRouter.post("/employeelogin", EmployeeLogin)
export {EmployeeRouter}