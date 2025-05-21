import express from "express";
import { getAttendanceCount, getDashboardCounts, getLeavesCount } from "../controller/OverviewController.js";




let OverviewRouter = express.Router()
OverviewRouter.post("/getdashboardcounts",getDashboardCounts)
OverviewRouter.post("/getleavecounts",getLeavesCount)
OverviewRouter.post("/getattendancecount",getAttendanceCount)
export{OverviewRouter}