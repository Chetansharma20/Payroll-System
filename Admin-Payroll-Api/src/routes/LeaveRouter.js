import express from "express"
import { AddLeave, fetchLeave, fetchLeaveByCompanyId, fetchLeaveByEmployeeId, fetchLeaveByMonthAndYear } from "../controller/LeaveController.js"

let LeaveRouter = express.Router()



LeaveRouter.get("/fetchleave", fetchLeave)
LeaveRouter.post("/addleave", AddLeave)
LeaveRouter.post("/fetchleavebycompanyid", fetchLeaveByCompanyId)
LeaveRouter.post("/fetchleavebymonthandyear", fetchLeaveByMonthAndYear)
LeaveRouter.post("/fetchleavebyemployeeid", fetchLeaveByEmployeeId)
export {LeaveRouter}