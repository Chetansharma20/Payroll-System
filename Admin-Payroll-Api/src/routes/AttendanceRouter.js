import express from "express"

import { AddAttendance,  fetchAttendance, fetchAttendanceByEmployeeID, fetchAttendanceByMonthAndYear, UpdateAttendance } from "../controller/AttendanceController.js"

let AttendanceRouter = express.Router()



AttendanceRouter.get("/fetchattendance", fetchAttendance)
AttendanceRouter.post("/addattendance", AddAttendance)
AttendanceRouter.post("/fetchattendancebyemployeeid", fetchAttendanceByEmployeeID)
AttendanceRouter.post("/fetchattendancebymonthandyear", fetchAttendanceByMonthAndYear)
AttendanceRouter.put("/updateattendance", UpdateAttendance)

export {AttendanceRouter}