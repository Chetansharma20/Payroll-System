import { Attendance } from "../models/AttendanceSchema.js";
import { Employee } from "../models/EmployeeSchema.js";
import { Leave } from "../models/LeaveSchema.js";
const getDashboardCounts = async (req,res)=>
    {
        // let { CompanyId } = req.body
        try
        {
            let {CompanyId} = req.body
            const employeeCount = await Employee.countDocuments({CompanyId})
            res.status(200).json({
                success:true,
                data:{
                    Employee:employeeCount
                }
            })
        }
        catch(error)
        {
            console.log(error)
            res.status(500).json({
                success:false,
                message:"failed",
                error:error.message
            })
        }
    } 
    const getLeavesCount = async (req,res)=>
    {
        // let { CompanyId } = req.body
        try
        {
            let {CompanyId} = req.body
            const LeaveCount = await Leave.countDocuments({CompanyId})
            res.status(200).json({
                success:true,
                data:{
                    Leave:LeaveCount
                }
            })
        }
        catch(error)
        {
            console.log(error)
            res.status(500).json({
                success:false,
                message:"failed",
                error:error.message
            })
        }
    } 
     const getAttendanceCount = async (req,res)=>
    {
        // let { CompanyId } = req.body
        try
        {
            let {CompanyId} = req.body
            const AttendanceCount = await Attendance.countDocuments({CompanyId})
            res.status(200).json({
                success:true,
                data:{
                    Attendance:AttendanceCount
                }
            })
        }
        catch(error)
        {
            console.log(error)
            res.status(500).json({
                success:false,
                message:"failed",
                error:error.message
            })
        }
    } 
    export {getDashboardCounts,getLeavesCount, getAttendanceCount}