import mongoose from "mongoose";

let DesignationSchema = mongoose.Schema({
    DesignationName:{type:String},
   CompanyId:{type:mongoose.Schema.Types.ObjectId, ref:"Company"},
//    DesignationIsActive:{
//     type:Boolean,
//     default:false
//    }
},{timestamp:true})

export const  Designation = mongoose.model("Desgnation", DesignationSchema)