import mongoose from "mongoose";

let AttendanceSchema = mongoose.Schema({
    EmployeeID: {type:mongoose.Schema.Types.ObjectId, ref:"Employee"},
    InPunchTime: {type: String},
    OutPunchTime: {type:String},
    AttendanceDate: {type:Date, default:Date},
    CompanyId:{type:mongoose.Schema.Types.ObjectId, ref:"Company"},
    
},{timestamps:true})
export const Attendance = mongoose.model("Attendance", AttendanceSchema)