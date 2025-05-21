import mongoose from "mongoose";

let SalaryHeadsSchema = mongoose.Schema({

    SalaryHeadsTitle: {type: String},
    ShortName:{type:String},
    SalaryHeadsType:{type:String,
        enum: {
            values: ["Earnings", "Deductions"],
            message: "select correct salary head type"
        }
    },
    SalaryHeadsValue:{type:Number},
    SalaryCalcultateMethod:
    {
        type: String,
        enum: {
            values: ["Fixed", "PF", "TRANS", "LWF"  ],
            message: "select correct salary head category"
        }

    },
      CompanyId:{type:mongoose.Schema.Types.ObjectId, ref:"Company"},
},{timestamps:true})
export const SalaryHeads = mongoose.model("Salary Heads", SalaryHeadsSchema)