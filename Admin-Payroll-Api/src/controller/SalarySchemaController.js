import { SalarySettings } from "../models/SalarySettingsSchema.js"


let AddSalarySettings = async (req, res)=>
{
    let reqData = req.body
    console.log("SalaryHeadsData",reqData)
    try
    {
        let result =  await SalarySettings.create(reqData)

        res.status(200).json({
            data: result,
            message: "Salary Settings Added Successfully"
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json(error)

    }


}
let fetchSalarySettingsByEmployee = async (req,res)=>
    {
        try
        {
            let {CompanyId, EmployeeID} = req.body
            let result = await SalarySettings.find({ CompanyId: CompanyId,
      EmployeeID: EmployeeID})
            // .where("CompanyId")
            // .eq(CompanyId)
            res.status(200).json(
               { data: result,
                message:"leaves"
         } )

        }
        catch(error)
        {
            res.status(500).json(error)

        }

    }
    export{AddSalarySettings, fetchSalarySettingsByEmployee}
    