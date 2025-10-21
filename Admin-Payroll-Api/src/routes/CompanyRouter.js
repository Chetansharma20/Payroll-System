import express from "express"
import { AddCompany, CompanyLogin, fetchCompany, UpdateCompany } from "../controller/CompanyController.js"
import { verifyRole } from "../MiddleWare/auth.js"
import { validateRequest } from "../MiddleWare/validateRequest.js"
import { CompanyValidation} from "../validators/CompanyValidation.js"

let CompanyRouter = express.Router()



CompanyRouter.get("/fetchcompany", verifyRole(["Company"]), fetchCompany)
CompanyRouter.post("/addcompany", validateRequest(CompanyValidation), AddCompany)
CompanyRouter.put("/updatecompany",verifyRole(["Company"]), UpdateCompany)
CompanyRouter.post("/companylogin", CompanyLogin)

export {CompanyRouter}