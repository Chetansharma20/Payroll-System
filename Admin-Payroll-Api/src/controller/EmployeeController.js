import { Employee } from "../models/EmployeeSchema.js";



// add company

let AddEmployee = async (req, res)=>
{
    let reqData = req.body
    console.log("EmployeeData",reqData)
    try
    {
        let filepath = req.file.path.replace("\\","/")

        let result =  await Employee.create({...req.body, EmployeePhoto:filepath})

        res.status(200).json({
            data: result,
            message: "Employee Added Successfully"
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json(error)

    }


}
//fetch company
    let fetchEmployee= async (req,res)=>
    {
        try
        {
            let result = await Employee.find().populate("CompanyId")
            res.status(200).json(result)

        }
        catch(error)
        {
            res.status(500).json(error)

        }

    }
    let UpdateEmployee = async (req,res)=>
            {
           let{EmployeeId,EmployeeDesignation } = req.body
                try
                {
                    let result = await Employee.findByIdAndUpdate({_id:EmployeeId},
                        {EmployeeDesignation:EmployeeDesignation},
                        {new:true}
                    )
                    res.status(200).json({
                        data: result,
                        message:"Employee Designation Updated"
                    })
                
    
                
                }
                catch(error)
                {
                    res.status(500).json(error)
                }
              
            }
        let DeleteEmployee = async (req,res)=>
      {
        try
        {
            let {EmployeeId} = req.body
            let result = await Employee.findByIdAndDelete({_id: EmployeeId })
            res.status(200).json({
                message:'Employee Deleted Successfully'
            })
        }
        catch(error)
        {
            res.status(500).json(error)
        }

        }
        let getEmployeeByCompany = async(req,res)=>
        {
            try
            {
                let {CompanyId} = req.body
                let result = await Employee.find({CompanyId:CompanyId})
                res.status(200).json({
                    data:result,
                    message:"Employee get"
                })
            }
            catch(error){
                res.status(500).json(error)
            }
        }
export {AddEmployee, fetchEmployee, UpdateEmployee, DeleteEmployee, getEmployeeByCompany}