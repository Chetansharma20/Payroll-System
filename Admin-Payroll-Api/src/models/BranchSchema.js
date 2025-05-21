import mongoose from "mongoose";

let BranchSchema = mongoose.Schema({
    BranchName: {type:String},
    BranchAddress: {type: String},
    RegistrationNo: {type:String},
    BranchCity: {type:String},
    BranchState:{type:String},
    BranchPinCode:{type:Number},
    // CompanyId:{type:String},
    BranchIsActive:{
        type:Boolean, 
        default:false
    },
  CompanyId:{type:mongoose.Schema.Types.ObjectId, ref:"Company"}
},{timestamps:true})
export const Branch = mongoose.model("Branch", BranchSchema)