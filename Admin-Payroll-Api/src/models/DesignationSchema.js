import mongoose from "mongoose";
// import { Department } from "./DepartmentSchema";

let DesignationSchema = mongoose.Schema({
    DesignationName:{type:String},
   CompanyId:{type:mongoose.Schema.Types.ObjectId, ref:"Company"},
//    DesignationIsActive:{
//     type:Boolean,
//     default:false
//    }
// DepartmentId: { type: mongoose.Schema.Types.ObjectId, ref: "/Department" }
DepartmentName:{type:String}
},{timestamp:true})

export const  Designation = mongoose.model("Designation", DesignationSchema)