import { SalarySlip } from "../models/SalarySlipSchema.js"


let AddSalarySlip = async (req, res)=>
{
    let reqData = req.body
    console.log("SalaryHeadsData",reqData)
    try
    {
        let result =  await SalarySlip.create(reqData)

        res.status(200).json({
            data: result,
            message: "Salary Slip Added Successfully"
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json(error)

    }


}
let fetchSalarySlipByEmployee = async (req,res)=>
    {
        try
        {
            let {CompanyId, EmployeeID} = req.body
            let result = await SalarySlip.find({ CompanyId: CompanyId,
      EmployeeID: EmployeeID})
            // .where("CompanyId")
            // .eq(CompanyId)
            res.status(200).json(
               { data: result,
                message:"Salary Slip"
         } )

        }
        catch(error)
        {
            res.status(500).json(error)

        }

    }
    export{AddSalarySlip, fetchSalarySlipByEmployee}
    