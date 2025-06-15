import mongoose, { mongo } from "mongoose";


let LeaveSchema = mongoose.Schema({
    EmployeeID:{type:mongoose.Schema.Types.ObjectId, ref:"Employee"},
    FromDate:{type:Date},
    ToDate:{type:Date},
    LeaveDescription:{type:String},
    LeaveType:{type:String },
LeaveStatus:{type:String, default: "pending",
    enum:
    {
    
    values:["pending", "approved","reject"],
    message:"please select correct status"
}},
CompanyId:{type:mongoose.Schema.Types.ObjectId, ref:"Company"}
   
},{timestamps:true})
export const Leave = mongoose.model("Leave", LeaveSchema)