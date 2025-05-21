
import { Bank } from "../models/BankSchema.js";


let AddBank = async(req,res)=>
{

let reqdata = req.body
console.log("BankData" ,reqdata)
try

{
   let result =  await Bank.create(reqdata)
   res.status(200).json({
    data:result,
    message:"Bank added successfuly"
   })
}
catch(error)
{
    console.log(error)
    res.status(500).json(error)
}


}
let FetchBank = async (req,res)=>
{ try
    {
            let result = await Bank.find()
            res.status(200).json(result)

        }
        catch(error)
        {
            res.status(500).json(error)

        }

}
export {AddBank, FetchBank}

