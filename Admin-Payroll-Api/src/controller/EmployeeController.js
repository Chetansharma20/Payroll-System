import { Employee } from "../models/EmployeeSchema.js";
import bcrypt from "bcryptjs";


// add company

let AddEmployee = async (req, res)=>
{
    let {
        EmployeeName,
         EmployeeEmail, EmployeeDesignation,  EmployeeCity, EmployeeState, EmployeePincode, EmployeeAddress, EmployeeGender, EmployeeDepartment,
         EmployeeJoiningDate, EmployeeDOB, EmployeeType, EmployeePassword, CompanyId,EmployeePhoneNo, BranchName
    } = req.body
    
    try
    {
        let EmployeePhoto = req.files?.EmployeePhoto?.[0]?.path?.replace("\\","/") || null;
        let AdhaarCard  = req.files?.AdhaarCard?.[0]?.path?.replace("\\","/") || null;
        let PanCard = req.files?.PanCard?.[0]?.path?.replace("\\","/") || null;
        let PassBook = req.files?.PassBook?.[0]?.path?.replace("\\","/") || null;
        let Degree = req.files?.Degree?.[0]?.path?.replace("\\","/") || null;
        // let Photo = req.file?.Photo?.[0]?.path?.replace("\\","/") || null;


       let salt  = await bcrypt.genSalt(10)
        let encryptPassword = await bcrypt.hash(EmployeePassword, salt)
        
        // let result =  await Company.create({...reqData, CompanyPassword:encryptPassword})
        let result =  await Employee.create({EmployeeName, EmployeeAddress, EmployeeCity, 
            EmployeeDepartment, EmployeeDesignation, EmployeeEmail, EmployeeEmail, 
            EmployeeGender, EmployeePincode, EmployeeState, EmployeeCity, EmployeePhoto,
             AdhaarCard, PanCard, PassBook, Degree, EmployeeJoiningDate, EmployeeDOB, EmployeeType,CompanyId, EmployeePhoneNo,BranchName, EmployeePassword:encryptPassword})

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
  let UpdateEmployee = async (req, res) => {
  try {
    const { EmployeeID } = req.body;

    if (!EmployeeID) {
      return res.status(400).json({ message: "EmployeeID is required" });
    }

    const updatedFields = {};

    if (req.files?.EmployeePhoto?.[0]) {
      updatedFields.EmployeePhoto = req.files.EmployeePhoto[0].path.replace("\\", "/");
    }
    if (req.files?.AdhaarCard?.[0]) {
      updatedFields.AdhaarCard = req.files.AdhaarCard[0].path.replace("\\", "/");
    }
    if (req.files?.PanCard?.[0]) {
      updatedFields.PanCard = req.files.PanCard[0].path.replace("\\", "/");
    }
    if (req.files?.PassBook?.[0]) {
      updatedFields.PassBook = req.files.PassBook[0].path.replace("\\", "/");
    }
    if (req.files?.Degree?.[0]) {
      updatedFields.Degree = req.files.Degree[0].path.replace("\\", "/");
    }

    const result = await Employee.findByIdAndUpdate(
      EmployeeID,
      updatedFields,
      { new: true }
    );

    res.status(200).json({
      data: result,
      message: "Employee documents updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating documents", error });
  }
};


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