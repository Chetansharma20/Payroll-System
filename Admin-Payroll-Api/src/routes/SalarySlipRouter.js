import express from "express"

import { AddSalarySlip, fetchSalarySlipByEmployee } from "../controller/SalarySlip.js"


let SalarySlipRouter = express.Router()




SalarySlipRouter.post("/addsalaryslip", AddSalarySlip)
SalarySlipRouter.post("/fetchsalaryslipbyemployee", fetchSalarySlipByEmployee)

export {SalarySlipRouter}