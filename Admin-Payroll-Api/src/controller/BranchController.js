import { Branch } from "../models/BranchSchema.js"

// add company
let AddBranch = async (req, res)=>
{
    let reqData = req.body
    console.log("BranchData",reqData)
    try
    {
        let result =  await Branch.create(reqData)

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
//fetch company
    let fetchBranch= async (req,res)=>
    {
        try
        {
            let result = await Branch.find()
            res.status(200).json(result)

        }
        catch(error)
        {
            res.status(500).json(error)

        }

    }
        let UpdateBranch = async (req,res)=>
        {
       let{BranchId, BranchIsActive} = req.body
            try
            {
                let result = await Branch.findByIdAndUpdate({_id:BranchId},
                    {BranchIsActive:BranchIsActive},
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
         let getBranchByCompany = async(req,res)=>
                {
                    try
                    {
                        let {CompanyId} = req.body
                        let result = await Branch.find({CompanyId:CompanyId})
                        res.status(200).json({
                            data:result,
                            message:"get Branch"
                        })
                    }
                    catch(error){
                        res.status(500).json(error)
                    }
                }
export {AddBranch, fetchBranch, UpdateBranch, getBranchByCompany}