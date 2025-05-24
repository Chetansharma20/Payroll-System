import mongoose from "mongoose";

let SalarySettingsSchema = mongoose.Schema(
    {
        CompanyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        EmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
        EffectFrom: { type: Date },
        SalaryHeads: [{
            SalaryHeadId: { type: mongoose.Schema.Types.ObjectId, ref: "SalaryHeads" },
            value: Number
        }
        ]
    },{timestamps:true})
export const SalarySettings = mongoose.model("SalarySettings", SalarySettingsSchema) 