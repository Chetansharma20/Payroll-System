import { Company } from "../models/CompanySchema.js";
import bcrypt from "bcryptjs";


// add company

let AddCompany = async (req, res)=>
{
    let reqData = req.body
    console.log("CompanyData",reqData)
    try
    {

        let salt  = await bcrypt.genSalt(10)
        let encryptPassword = await bcrypt.hash(reqData.CompanyPassword, salt)
        let result =  await Company.create({...reqData, CompanyPassword:encryptPassword})

        res.status(200).json({
            data: result,
            message: "company Added Successfully"
        })
    }

    catch(error)
    {
        console.log(error)
        res.status(500).json(error)

    }


}


let CompanyLogin = async(req,res)=>
{
    
    try{
    let {CompanyEmail, CompanyPassword} = req.body;
    let logedUser = await Company.findOne({ CompanyEmail })
    console.log(logedUser)
    if (!logedUser) 
    {
        return res.status(400).json({
            message: "User Not Registered"
        })
        
    }
    let isValidPassword = await bcrypt.compare(CompanyPassword, logedUser.CompanyPassword);
if(!isValidPassword) {
    return res.status(400).json({
        message:"Invalid Password"
    });
}
return res.status(200).json({
    data: logedUser,
    message:"Login Successfull"
})
}
catch(error)
{
    console.log(error)
    res.status(500).json({message:"Internal server error", error})

}
}
//fetch company
    let fetchCompany= async (req,res)=>
    {
        try
        {
            let result = await Company.find()
            res.status(200).json(result)

        }
        catch(error)
        {
            res.status(500).json(error)

        }

    }
    let UpdateCompany = async (req,res)=>
        {
       let{CompanyId, CompanyIsActive} = req.body
            try
            {
                let result = await Company.findByIdAndUpdate({_id:CompanyId},
                    {CompanyIsActive:CompanyIsActive},
                    {new:true}
                )
                res.status(200).json({
                    data: result,
                    message:"Branch Updated"
                })
            

            
            }
            catch(error)
            {
                res.status(500).json(error)
            }
          
        }



        export {AddCompany, fetchCompany, UpdateCompany, CompanyLogin}