import { Department } from "../models/DepartmentSchema.js"


let AddDepartment = async(req,res)=>
{

let reqdata = req.body
console.log("Department" ,reqdata)
try

{
   let result =  await Department.create(reqdata)
   res.status(200).json({
    data:result,
    message:"Departmnet added successfuly"
   })
}
catch(error)
{
    console.log(error)
    res.status(500).json(error)
}


}
let FetchDepartment = async (req,res)=>
{ try
    {
        
            let result = await Department.find()
            res.status(200).json(result)

        }
        catch(error)
        {
            res.status(500).json(error)

        }

}
let FetchDepartmentByCompany = async (req,res)=>
    { try
        {
            let {CompanyId} = req.body
            
                let result = await Department.find({CompanyId})
                res.status(200).json(result)
    
            }
            catch(error)
            {
                res.status(500).json(error)
    
            }
    
    }
export {AddDepartment, FetchDepartment, FetchDepartmentByCompany}

