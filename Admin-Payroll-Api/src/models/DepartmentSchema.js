import mongoose from "mongoose";

let DepartmentSchema = mongoose.Schema({
    DepartmentName:{type:String},
   CompanyId:{type:mongoose.Schema.Types.ObjectId, ref:"Company"},
//    DepartmentIsActive:{
//     type:Boolean,
//     default:false
//    }
},{timestamp:true})

export const  Department = mongoose.model("Department", DepartmentSchema)