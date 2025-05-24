import express from "express";
import { getAttendanceCount, getAttendanceCountByEmployee, getDashboardCounts, getLeavesCount, getLeavesCountByEmployee } from "../controller/OverviewController.js";





let OverviewRouter = express.Router()
OverviewRouter.post("/getdashboardcounts",getDashboardCounts)
OverviewRouter.post("/getleavecounts",getLeavesCount)
OverviewRouter.post("/getattendancecount",getAttendanceCount)

OverviewRouter.post("/getattendancecountbyemployee",getAttendanceCountByEmployee)
OverviewRouter.post("/getleavescountbyemployee",getLeavesCountByEmployee)
export{OverviewRouter}