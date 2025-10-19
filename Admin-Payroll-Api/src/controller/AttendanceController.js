import mongoose from "mongoose";
import { Attendance } from "../models/AttendanceSchema.js";
import { Employee } from "../models/EmployeeSchema.js"; // optional if you need employee validation

// ----------------------------
// Add New Attendance
// ----------------------------
const AddAttendance = async (req, res) => {
  try {
    const { CompanyId, EmployeeID, AttendanceDate, InPunchTime, OutPunchTime } =
      req.body;

    if (!CompanyId || !EmployeeID || !AttendanceDate || !InPunchTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const inTime = new Date(InPunchTime);
    const outTime = OutPunchTime ? new Date(OutPunchTime) : null;

    const startOfDay = new Date(AttendanceDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(AttendanceDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingRecord = await Attendance.findOne({
      CompanyId,
      EmployeeID,
      AttendanceDate: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingRecord) {
      return res.status(409).json({
        success: false,
        message:
          "Attendance already marked for this employee on the selected date.",
      });
    }

    let shiftType = "DAY";
    let totalHours = null;




if (outTime) {
  if (outTime < inTime) {
    // NIGHT shift
    shiftType = "NIGHT";
    totalHours = (outTime.getTime() + 24 * 60 * 60 * 1000 - inTime.getTime()) / (1000 * 60);
  } else {
    // DAY shift
    totalHours = (outTime.getTime() - inTime.getTime()) / (1000 * 60);
  }

  // Round to nearest minute first, then convert to hours
  totalHours = Math.round(totalHours) / 60;
}


    const attendance = await Attendance.create({
      CompanyId,
      EmployeeID,
      AttendanceDate: new Date(AttendanceDate),
      InPunchTime: inTime,
      OutPunchTime: outTime,
      ShiftType: shiftType,
      TotalHours: totalHours,
    });

    res.status(201).json({
      success: true,
      data: attendance,
      message: "Attendance added successfully",
    });
  } catch (error) {
    console.error("Error adding attendance:", error);
    res.status(500).json({ error: error.message });
  }
};

// ----------------------------
// Fetch All Attendance
// ----------------------------
const fetchAttendance = async (req, res) => {
  try {
    const result = await Attendance.find()
      .populate("EmployeeID", "EmployeeName")
      .select("AttendanceDate InPunchTime OutPunchTime TotalHours ShiftType")
      .sort({ AttendanceDate: -1 });

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "No attendance records found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Attendance records fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ----------------------------
// Fetch Attendance by Employee ID
// ----------------------------
const fetchAttendanceByEmployeeID = async (req, res) => {
  const { EmployeeID } = req.body;
console.log("Received EmployeeID:", EmployeeID);

  try {
    if (!mongoose.Types.ObjectId.isValid(EmployeeID)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid EmployeeID" });
    }

    const result = await Attendance.find({ EmployeeID })
      .populate("EmployeeID", "EmployeeName Department Designation")
      .sort({ AttendanceDate: -1 });

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "No attendance records found for this employee",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Attendance data fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching employee attendance:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ----------------------------
// Fetch Attendance by Month & Year
// ----------------------------
const fetchAttendanceByMonthAndYear = async (req, res) => {
  try {
    const { CompanyId, EmployeeID, month, year } = req.body;

    // ✅ Validation
    if (!CompanyId || !EmployeeID || !month || !year) {
      return res.status(400).json({
        success: false,
        message: "CompanyId, EmployeeID, month, and year are required",
      });
    }

    if (
      isNaN(month) ||
      isNaN(year) ||
      parseInt(month) < 1 ||
      parseInt(month) > 12 ||
      parseInt(year) < 2000
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid month or year",
      });
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
          month: { $month: "$AttendanceDate" },
          year: { $year: "$AttendanceDate" },
        },
      },
      {
        $match: {
          month: parseInt(month),
          year: parseInt(year),
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "EmployeeID",
          foreignField: "_id",
          as: "EmployeeData",
        },
      },
      { $unwind: { path: "$EmployeeData", preserveNullAndEmptyArrays: true } },
    {
  $project: {
    _id: 1,
    AttendanceDate: 1,
    InPunchTime: 1,
    OutPunchTime: 1,
    TotalHours: 1,
    ShiftType: 1,
    "EmployeeData._id": 1,
    "EmployeeData.EmployeeName": 1,
  },
},
{ $sort: { AttendanceDate: -1 } },
    ];

    const result = await Attendance.aggregate(pipeline);

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "No attendance found for the specified month and year",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Attendance data fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching attendance by month/year:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
// ----------------------------
// Update Attendance by ID
// ----------------------------
// ----------------------------
// Update Attendance (ID in body)
// ----------------------------
// ----------------------------
// Update Attendance
// ----------------------------
const UpdateAttendance = async (req, res) => {
  try {
    const { id, InPunchTime, OutPunchTime } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Attendance ID is required" });
    }

    // Convert and validate times
    const inTime = InPunchTime ? new Date(InPunchTime) : null;
    const outTime = OutPunchTime ? new Date(OutPunchTime) : null;

    if (!inTime || isNaN(inTime)) {
      return res.status(400).json({ success: false, message: "Invalid InPunchTime format" });
    }
    if (OutPunchTime && isNaN(outTime)) {
      return res.status(400).json({ success: false, message: "Invalid OutPunchTime format" });
    }

    // Calculate total hours and shift type
    let totalHours = null;
    let shiftType = "DAY";

    if (outTime) {
      if (outTime < inTime) {
        shiftType = "NIGHT";
        totalHours = (outTime.getTime() + 24 * 60 * 60 * 1000 - inTime.getTime()) / (1000 * 60);
      } else {
        totalHours = (outTime.getTime() - inTime.getTime()) / (1000 * 60);
      }
      totalHours = Math.round(totalHours) / 60; // Convert to hours
    }

    const updated = await Attendance.findByIdAndUpdate(
      id,
      {
        InPunchTime: inTime,
        OutPunchTime: outTime,
        TotalHours: totalHours,
        ShiftType: shiftType,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Attendance record not found" });
    }

    res.status(200).json({
      success: true,
      data: updated,
      message: "Attendance updated successfully",
    });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------------------
// Export
// ----------------------------
export {
  AddAttendance,
  fetchAttendance,
  fetchAttendanceByEmployeeID,
  fetchAttendanceByMonthAndYear,
  UpdateAttendance
};
