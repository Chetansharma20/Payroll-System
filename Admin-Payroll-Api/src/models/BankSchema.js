import mongoose from "mongoose";

let BankSchema= mongoose.Schema({
   BankName: {
       type:String
    },
    Bank_IFSC_Code: {
        type:String
     },
     BranchCode:{
        type: String
     },
     BranchCity:{
        type:String
     }
})
export const Bank = mongoose.model("Bank", BankSchema)