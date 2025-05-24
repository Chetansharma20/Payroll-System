import mongoose from "mongoose";

let SalarySlipSchema = mongoose.Schema(
    {
        CompanyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        EmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
        SalaryComponents:{Earnings:[],Allowances:[],Deductions:[]},
        Totals: {
      GrossSalary: { type: Number, default: 0 },  // Lowercase 'type'
      TotalDeduction: { type: Number, default: 0 }, // Consistent lowercase
      NetSalary: { type: Number, default: 0 }
    }
       
    },{timestamps:true})
export const SalarySlip = mongoose.model("SalarySlip", SalarySlipSchema) 