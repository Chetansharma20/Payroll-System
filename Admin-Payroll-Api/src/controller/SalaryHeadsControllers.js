
import mongoose from "mongoose"
import { SalaryHeads } from "../models/SalaryHeadsSchema.js"


// add company
let AddSalaryHeads = async (req, res)=>
{
    let reqData = req.body
    console.log("SalaryHeadsData",reqData)
    try
    {
        let result =  await SalaryHeads.create(reqData)

        res.status(200).json({
            data: result,
            message: "SalaryHeads Added Successfully"
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json(error)

    }


}
//fetch company
    let fetchSalaryHeads= async (req,res)=>
    {
        try
        {
            let result = await SalaryHeads.find()
            res.status(200).json(result)

        }
        catch(error)
        {
            res.status(500).json(error)

        }

    }


let SalaryHeadsByCompany = async(req,res)=>
{
    try{
        let {CompanyId} = req.body
        let result = await SalaryHeads.find({ CompanyId})
        res.status(200).json(({
            data:result,
            message:"get salaryheads by company"
        }))

    }catch(error)
    {
        res.status(500).json(error)
    }
}

       
export {AddSalaryHeads, fetchSalaryHeads, SalaryHeadsByCompany}