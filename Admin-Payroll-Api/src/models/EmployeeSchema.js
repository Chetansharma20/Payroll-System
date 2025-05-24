import mongoose, { mongo } from "mongoose";

let EmployeeSchema = mongoose.Schema({
    EmployeeName: {type:String,
      
    },
    EmployeeEmail: {type: String, },
    EmployeePhoneNo: {type:Number},
    EmployeeAddress: {type: String},
    
    EmployeeCity: {type:String},
    EmployeeState:{type:String},
    EmployeePincode:{type:Number},
    // EmployeePhoto:{type: String},
    EmployeeGender:{type: String,
        enum: {
            values: ["Male", "Female", "Others"],
            message: "select correct gender"
        }
       
    },
    EmployeePassword: {type:String},
    EmployeeDOB: {type: Date,},
    EmployeeJoiningDate:{type: Date,},
    EmployeeDesignation:{type:String,},
    EmployeeDepartment:{type:String,},
    EmployeeType:{type:String,},
    BranchId:{type:mongoose.Schema.Types.ObjectId, ref:"Branch"},
    CompanyId:{type:mongoose.Schema.Types.ObjectId, ref:"Company"},
EmployeePhoto:{
    type:String
}

 
},{timestamps:true})
export const Employee = mongoose.model("Employee", EmployeeSchema)