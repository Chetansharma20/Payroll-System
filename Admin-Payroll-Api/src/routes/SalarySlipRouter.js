import express from "express"

import {  calculateSalarybycompany, calculateSalaryDetailed, fetchSalarySlipByEmployee, getSalaryslip, getSalaryslipByCompany } from "../controller/SalarySlip.js"


let SalarySlipRouter = express.Router()




// SalarySlipRouter.post("/addsalaryslip", AddSalarySlip)
SalarySlipRouter.post("/fetchsalaryslipbyemployee", fetchSalarySlipByEmployee)
SalarySlipRouter.get("/getsalaryslip", getSalaryslip)
SalarySlipRouter.post("/calculatesalaryslip", calculateSalaryDetailed)
SalarySlipRouter.post("/calculatesalaryslipbycompany", calculateSalarybycompany)
SalarySlipRouter.post("/getsalaryslipbycompany", getSalaryslipByCompany)
// SalarySlipRouter.post("/fetchsalaryslipbyemployee", fetchSalarySlipByEmployee)

export {SalarySlipRouter}