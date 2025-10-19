import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  CompanyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  EmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  AttendanceDate: { type: Date, required: true }, // base date of shift start
  InPunchTime: { type: Date, required: true },
  OutPunchTime: { type: Date },
  ShiftType: { type: String, enum: ["DAY", "NIGHT"], default: "DAY" },
  TotalHours: { type: Number },
},{timestamps:true});

export const Attendance = mongoose.model("Attendance", AttendanceSchema)