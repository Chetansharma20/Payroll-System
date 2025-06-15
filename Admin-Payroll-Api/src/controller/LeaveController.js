import mongoose from "mongoose";
// import { Employee } from "../models/EmployeeSchema.js";
import { Leave } from "../models/LeaveSchema.js";



// add company

let AddLeave = async (req, res)=>
{
    let reqData = req.body
    console.log("LeaveData",reqData)
    try
    {
        let result =  await Leave.create(reqData)

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
    let fetchLeave= async (req,res)=>
    {
        try
        {
            let result = await Leave.find()
            res.status(200).json(result)

        }
        catch(error)
        {
            res.status(500).json(error)

        }

    }
    let fetchLeaveByCompanyId = async (req,res)=>
    {
        try
        {
            let {CompanyId, EmployeeID} = req.body
            let result = await Leave.find({ CompanyId: CompanyId,
      EmployeeID: EmployeeID}).populate("EmployeeID", "EmployeeName")
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
    
    let fetchLeaveByEmployeeId = async (req,res)=>
    {
        try
        {
            let { EmployeeID} = req.body
            let result = await Leave.find({ EmployeeID: EmployeeID }).populate("EmployeeID", "EmployeeName")
            // .where("CompanyId")
            // .eq(CompanyId)
            res.status(200).json(
               { data: result,
                message:"leaves by employee"
         } )

        }
        catch(error)
        {
            res.status(500).json(error)

        }

    }

let  fetchLeaveByMonthAndYear = async (req, res) => {
  try {
    const { CompanyId, EmployeeID, month, year } = req.body;

    if (!CompanyId || !EmployeeID || !month || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const pipeline = [
      {
        $match: {
          CompanyId: new mongoose.Types.ObjectId(CompanyId),
          EmployeeID: new mongoose.Types.ObjectId(EmployeeID),
        },
      },
      {
        $addFields: {
          fromMonth: { $month: "$FromDate" },
          fromYear: { $year: "$FromDate" },
        },
      },
      {
        $match: {
          fromMonth: parseInt(month),
          fromYear: parseInt(year),
        },
      },
      {
        $lookup: {
          from: "employees", // collection name, ensure it's correct (lowercase plural of model)
          localField: "EmployeeID",
          foreignField: "_id",
          as: "EmployeeData",
        },
      },
      {
        $unwind: {
          path: "$EmployeeData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          FromDate: 1,
          ToDate: 1,
          LeaveDescription: 1,
          LeaveType: 1,
          LeaveStatus: 1,
          EmployeeID: {
            _id: "$EmployeeData._id",
            EmployeeName: "$EmployeeData.EmployeeName",
          },
        },
      },
    ];

    const result = await Leave.aggregate(pipeline);
    res.status(200).json({ data: result, message: "Filtered leaves" });

  } catch (error) {
    console.error("Error fetching leaves:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

   const updateLeaveStatus = async (req, res) => {
    try {
        const { LeaveId, LeaveStatus } = req.body;

        const result = await Leave.findByIdAndUpdate(
            LeaveId,
            { LeaveStatus },
            { new: true }
        );

        res.status(200).json({
            data: result,
            message: "Leave status updated",
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating leave status", error});
}
};
export {AddLeave, fetchLeave, fetchLeaveByCompanyId, fetchLeaveByMonthAndYear, fetchLeaveByEmployeeId, updateLeaveStatus}