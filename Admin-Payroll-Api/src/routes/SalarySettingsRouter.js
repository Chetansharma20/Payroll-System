import express from "express"
import { AddSalarySettings, fetchSalarySettings, fetchSalarySettingsByEmployee } from "../controller/SalarySettingsController.js"


let SalarySettingsRouter = express.Router()




SalarySettingsRouter.post("/addsalarysettings", AddSalarySettings)
SalarySettingsRouter.post("/fetchsalarysettingsbyemployee", fetchSalarySettingsByEmployee)
SalarySettingsRouter.get("/fetchsalarysettings", fetchSalarySettings)
export {SalarySettingsRouter}