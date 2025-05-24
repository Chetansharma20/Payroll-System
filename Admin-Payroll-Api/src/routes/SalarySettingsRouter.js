import express from "express"
import { AddSalarySettings, fetchSalarySettingsByEmployee } from "../controller/SalarySchemaController.js"


let SalarySettingsRouter = express.Router()




SalarySettingsRouter.post("/addsalarysettings", AddSalarySettings)
SalarySettingsRouter.post("/fetchsalarysettingsbyemployee", fetchSalarySettingsByEmployee)

export {SalarySettingsRouter}