import mongoose, { mongo } from "mongoose";

let CompanySchema = mongoose.Schema({
    CompanyEmail:{type:String},
    CompanyName: {type:String},
    CompanyAddress: {type: String},
    RegistrationNo: {type:String},
    CompanyCity: {type:String},
    CompanyState:{type:String},
    
    CompanyIsActive:{
        type:Boolean, 
        default:false
    },
    CompanyPassword:{type:String}
  
},{timestamps:true})
export const Company = mongoose.model("Company", CompanySchema)