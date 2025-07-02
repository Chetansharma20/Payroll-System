import mongoose from "mongoose";

let SalarySlipSchema = mongoose.Schema(
    {
        CompanyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        EmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
        Deductions:{type:Array},
        Earnings:{type:Array},
        Month:{type:String},
        // todate:{type:String},
     totalEarnings:{type:Number},
     totalDeductions:{type:Number},
     grossSalary:{type:Number},
     netSalary:{type:Number},
       
    },{timestamps:true})
export const SalarySlip = mongoose.model("SalarySlip", SalarySlipSchema) 