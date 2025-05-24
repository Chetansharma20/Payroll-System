import { Employee } from "../models/EmployeeSchema.js";
import bcrypt from "bcryptjs";


// add company

let AddEmployee = async (req, res)=>
{
    let reqData = req.body
    console.log("EmployeeData",reqData)
    try
    {
        let filepath = req.file.path.replace("\\","/")
       let salt  = await bcrypt.genSalt(10)
        let encryptPassword = await bcrypt.hash(reqData.EmployeePassword, salt)
        
        // let result =  await Company.create({...reqData, CompanyPassword:encryptPassword})
        let result =  await Employee.create({...reqData, EmployeePhoto:filepath, EmployeePassword:encryptPassword})

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

let EmployeeLogin = async(req,res)=>
{
    
    try{
    let { EmployeeEmail, EmployeePassword } = req.body;
    let logedUser = await Employee.findOne({ EmployeeEmail }).populate("CompanyId")
    console.log(logedUser)
    if (!logedUser) 
    {
        return res.status(400).json({
            message: "User Not Registered"
        })
        
    }
    let isValidPassword = await bcrypt.compare(EmployeePassword, logedUser.EmployeePassword);

if(!isValidPassword) {
    return res.status(400).json({
        message:"Invalid Password"
    });
}
else
{
return res.status(200).json({
    data: logedUser,
    message:"Login Successfull"
})
}
}
catch(error)
{
    console.log(error)
    res.status(500).json({message:"Internal server error", error})

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
           let{EmployeeID,EmployeeDesignation } = req.body
                try
                {
                    let result = await Employee.findByIdAndUpdate({_id:EmployeeID},
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
export {AddEmployee, fetchEmployee, UpdateEmployee, DeleteEmployee, getEmployeeByCompany, EmployeeLogin}