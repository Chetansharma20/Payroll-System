import express from "express"
import { AddLeave, fetchLeave, fetchLeaveByCompanyId, fetchLeaveByEmployeeId, fetchLeaveByMonthAndYear, updateLeaveStatus } from "../controller/LeaveController.js"

let LeaveRouter = express.Router()



LeaveRouter.get("/fetchleave", fetchLeave)
LeaveRouter.post("/addleave", AddLeave)
LeaveRouter.post("/fetchleavebycompanyid", fetchLeaveByCompanyId)
LeaveRouter.post("/fetchleavebymonthandyear", fetchLeaveByMonthAndYear)
LeaveRouter.post("/fetchleavebyemployeeid", fetchLeaveByEmployeeId)
LeaveRouter.post("/updateleavestatus", updateLeaveStatus)
export {LeaveRouter}