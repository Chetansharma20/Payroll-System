// import { Attendance } from "../models/AttendanceSchema.js";
// import { Employee } from "../models/EmployeeSchema.js";
// import { Leave } from "../models/LeaveSchema.js";
// const getDashboardCounts = async (req,res)=>
//     {
//         // let { CompanyId } = req.body
//         try
//         {
//             let {CompanyId} = req.body
//             const employeeCount = await Employee.countDocuments({CompanyId})
//             res.status(200).json({
//                 success:true,
//                 data:{
//                     Employee:employeeCount
//                 }
//             })
//         }
//         catch(error)
//         {
//             console.log(error)
//             res.status(500).json({
//                 success:false,
//                 message:"failed",
//                 error:error.message
//             })
//         }
//     } 
//     const getLeavesCount = async (req,res)=>
//     {
//         // let { CompanyId } = req.body
//         try
//         {
//             let {CompanyId} = req.body
//             const LeaveCount = await Leave.countDocuments({CompanyId})
//             res.status(200).json({
//                 success:true,
//                 data:{
//                     Leave:LeaveCount
//                 }
//             })
//         }
//         catch(error)
//         {
//             console.log(error)
//             res.status(500).json({
//                 success:false,
//                 message:"failed",
//                 error:error.message
//             })
//         }
//     } 
//     const getLeavesCountByEmployee = async (req,res)=>
//     {
//         // let { CompanyId } = req.body
//         try
//         {
//             let {EmployeeID} = req.body
//             const LeaveCount = await Leave.countDocuments({EmployeeID})
//             res.status(200).json({
//                 success:true,
//                 data:{
//                     Leave:LeaveCount
//                 }
//             })
//         }
//         catch(error)
//         {
//             console.log(error)
//             res.status(500).json({
//                 success:false,
//                 message:"failed",
//                 error:error.message
//             })
//         }
//     } 
//      const getAttendanceCount = async (req,res)=>
//     {
//         // let { CompanyId } = req.body
//         try
//         {
//             let {CompanyId} = req.body
//             const AttendanceCount = await Attendance.countDocuments({CompanyId})
//             res.status(200).json({
//                 success:true,
//                 data:{
//                     Attendance:AttendanceCount
//                 }
//             })
//         }
//         catch(error)
//         {
//             console.log(error)
//             res.status(500).json({
//                 success:false,
//                 message:"failed",
//                 error:error.message
//             })
//         }
//     } 
//     const getAttendanceCountByEmployee = async (req,res)=>
//     {
//         // let { CompanyId } = req.body
//         try
//         {
//             let {EmployeeID} = req.body
//             const AttendanceCount = await Attendance.countDocuments({EmployeeID})
//             res.status(200).json({
//                 success:true,
//                 data:{
//                     Attendance:AttendanceCount
//                 }
//             })
//         }
//         catch(error)
//         {
//             console.log(error)
//             res.status(500).json({
//                 success:false,
//                 message:"failed",
//                 error:error.message
//             })
//         }
//     } 
//     export {getDashboardCounts,getLeavesCount, getAttendanceCount, getLeavesCountByEmployee, getAttendanceCountByEmployee}
import { Attendance } from "../models/AttendanceSchema.js";
import { Employee } from "../models/EmployeeSchema.js";
import { Leave } from "../models/LeaveSchema.js";
import dayjs from "dayjs"; // for date manipulation

// Helper to get today's date range
const getTodayRange = () => {
    const start = dayjs().startOf("day").toDate(); // today 00:00:00
    const end = dayjs().endOf("day").toDate();     // today 23:59:59
    return { start, end };
};

const getDashboardCounts = async (req, res) => {
    try {
        const { CompanyId } = req.body;
        if (!CompanyId) {
            return res.status(400).json({ success: false, message: "CompanyId is required" });
        }

        const employeeCount = await Employee.countDocuments({ CompanyId });
        res.status(200).json({
            success: true,
            data: { Employee: employeeCount }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "failed", error: error.message });
    }
};

const getLeavesCount = async (req, res) => {
    try {
        const { CompanyId, today } = req.body;
        if (!CompanyId) {
            return res.status(400).json({ success: false, message: "CompanyId is required" });
        }

        let filter = { CompanyId };
        if (today) {
            const { start, end } = getTodayRange();
            filter.LeaveDate = { $gte: start, $lte: end };
        }

        const LeaveCount = await Leave.countDocuments(filter);
        res.status(200).json({ success: true, data: { Leave: LeaveCount } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "failed", error: error.message });
    }
};

const getLeavesCountByEmployee = async (req, res) => {
    try {
        const { EmployeeID, today } = req.body;
        if (!EmployeeID) {
            return res.status(400).json({ success: false, message: "EmployeeID is required" });
        }

        let filter = { EmployeeID };
        if (today) {
            const { start, end } = getTodayRange();
            filter.LeaveDate = { $gte: start, $lte: end };
        }

        const LeaveCount = await Leave.countDocuments(filter);
        res.status(200).json({ success: true, data: { Leave: LeaveCount } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "failed", error: error.message });
    }
};

const getAttendanceCount = async (req, res) => {
    try {
        const { CompanyId, today } = req.body;
        if (!CompanyId) {
            return res.status(400).json({ success: false, message: "CompanyId is required" });
        }

        let filter = { CompanyId };
        if (today) {
            const { start, end } = getTodayRange();
            filter.AttendanceDate = { $gte: start, $lte: end };
        }

        const AttendanceCount = await Attendance.countDocuments(filter);
        res.status(200).json({ success: true, data: { Attendance: AttendanceCount } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "failed", error: error.message });
    }
};

const getAttendanceCountByEmployee = async (req, res) => {
    try {
        const { EmployeeID, today } = req.body;
        if (!EmployeeID) {
            return res.status(400).json({ success: false, message: "EmployeeID is required" });
        }

        let filter = { EmployeeID };
        if (today) {
            const { start, end } = getTodayRange();
            filter.AttendanceDate = { $gte: start, $lte: end };
        }

        const AttendanceCount = await Attendance.countDocuments(filter);
        res.status(200).json({ success: true, data: { Attendance: AttendanceCount } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "failed", error: error.message });
    }
};

export {
    getDashboardCounts,
    getLeavesCount,
    getAttendanceCount,
    getLeavesCountByEmployee,
    getAttendanceCountByEmployee
};
