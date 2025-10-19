import mongoose from "mongoose";
// import { Employee } from "../models/EmployeeSchema.js";
import { Leave } from "../models/LeaveSchema.js";



// add company
let AddLeave = async (req, res) => {
  try {
    const reqData = req.body;
    console.log("LeaveData", reqData);

    const { EmployeeID, CompanyId, FromDate, ToDate } = reqData;

    if (!EmployeeID || !CompanyId || !FromDate || !ToDate) {
      return res.status(400).json({
        success: false,
        message: "EmployeeID, CompanyId, FromDate, and ToDate are required",
      });
    }

    // ✅ Step 1: Check for overlapping or duplicate leave for the same employee
    const overlap = await Leave.findOne({
      EmployeeID,
      CompanyId,
      $or: [
        {
          FromDate: { $lte: ToDate },
          ToDate: { $gte: FromDate },
        },
      ],
    });

    if (overlap) {
      return res.status(400).json({
        success: false,
        message: "Leave already exists or overlaps with an existing leave for this employee.",
      });
    }

    // ✅ Step 2: Create the leave
    const result = await Leave.create(reqData);

    res.status(200).json({
      success: true,
      data: result,
      message: "Leave added successfully",
    });
  } catch (error) {
    console.error("Error adding leave:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while adding leave",
      error: error.message,
    });
  }
};

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

    // 1. Check if the leave exists
    const existingLeave = await Leave.findById(LeaveId);
    if (!existingLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // 2. Restrict update based on current status
    if (existingLeave.LeaveStatus === "approved" && LeaveStatus !== "approved") {
      return res.status(400).json({
        message: "Cannot change status. Approved leave cannot be modified or rejected.",
      });
    }

    if (existingLeave.LeaveStatus === "rejected" && LeaveStatus !== "rejected") {
      return res.status(400).json({
        message: "Cannot update status. Rejected leave cannot be modified.",
      });
    }

    // 3. Proceed with valid update
    const result = await Leave.findByIdAndUpdate(
      LeaveId,
      { LeaveStatus },
      { new: true }
    );

    res.status(200).json({
      data: result,
      message: "Leave status updated successfully",
    });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ message: "Error updating leave status", error });
  }
};

export {AddLeave, fetchLeave, fetchLeaveByCompanyId, fetchLeaveByMonthAndYear, fetchLeaveByEmployeeId, updateLeaveStatus}