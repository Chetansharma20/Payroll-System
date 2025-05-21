import express from "express"

import { AddAttendance, fetchAttendaceByEmployeeID, fetchAttendance, fetchAttendanceByMonthAndYear } from "../controller/AttendanceController.js"

let AttendanceRouter = express.Router()



AttendanceRouter.get("/fetchattendance", fetchAttendance)
AttendanceRouter.post("/addattendance", AddAttendance)
AttendanceRouter.post("/fetchattendancebyemployeeid", fetchAttendaceByEmployeeID)
AttendanceRouter.post("/fetchattendancebymonthandyear", fetchAttendanceByMonthAndYear)


export {AttendanceRouter}