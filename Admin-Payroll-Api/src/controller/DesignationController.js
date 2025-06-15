import { Designation } from "../models/DesignationSchema.js"

Designation


let AddDesignation = async(req,res)=>
{

let reqdata = req.body
console.log("Department" ,reqdata)
try

{
   let result =  await Designation.create(reqdata)
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
let FetchDesignation = async (req,res)=>
{ try
    {
            let result = await Designation.find()
            res.status(200).json(result)

        }
        catch(error)
        {
            res.status(500).json(error)

        }

}
let FetchDesignationByCompany = async (req,res)=>
    { 
        try
        {
            let {CompanyId, DepartmentId} = req.body 
                let result = await Designation.find({CompanyId, DepartmentId}).populate( "DepartmentName")
                res.status(200).json(result)
    
            }
            catch(error)
            {
                res.status(500).json(error)
    
            }
    
    }
//     let FetchDesignationByDepartment = async (req, res) => {
//   try {
//     const { CompanyId, DepartmentId } = req.body;
//     let result = await Designation.find({ CompanyId, DepartmentId });
//     res.status(200).json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error fetching designations by department" });
//   }
// };

export {AddDesignation, FetchDesignation, FetchDesignationByCompany}

