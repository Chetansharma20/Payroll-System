import express from "express"
import { AddCompany, CompanyLogin, fetchCompany, UpdateCompany } from "../controller/CompanyController.js"

let CompanyRouter = express.Router()



CompanyRouter.get("/fetchcompany", fetchCompany)
CompanyRouter.post("/addcompany", AddCompany)
CompanyRouter.put("/updatecompany", UpdateCompany)
CompanyRouter.post("/companylogin", CompanyLogin)

export {CompanyRouter}