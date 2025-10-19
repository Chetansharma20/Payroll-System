import express from "express"
import {  AddSalaryHeads,  DeleteSalaryHead,  fetchSalaryHeads, SalaryHeadsByCompany } from "../controller/SalaryHeadsControllers.js"



let SalaryHeadsRouter = express.Router()



SalaryHeadsRouter.get("/fetchsalaryheads", fetchSalaryHeads)
SalaryHeadsRouter.post("/addsalaryheads", AddSalaryHeads)
SalaryHeadsRouter.post("/salaryheadsbycompany", SalaryHeadsByCompany)
SalaryHeadsRouter.delete("/deletesalaryhead", DeleteSalaryHead)

export {SalaryHeadsRouter}