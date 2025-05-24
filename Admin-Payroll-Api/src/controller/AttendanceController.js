
import mongoose from "mongoose"
import { Attendance } from "../models/AttendanceSchema.js"

let AddAttendance = async (req, res)=>
{
    let reqData = req.body
    console.log("LeaveData",reqData)
    try
    {
        let result =  await Attendance.create(reqData)

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
    let fetchAttendance= async (req,res)=>
    {
        try
        {
            let result = await Attendance.find()
            res.status(200).json(result)

        }
        catch(error)
        {
            res.status(500).json(error)

        }

    }
    
     let fetchAttendaceByEmployeeID = async(req,res)=>
     {
        let{ EmployeeID, } = req.body
        try
        {
            let result  = await Attendance.find({EmployeeID:EmployeeID}).populate("EmployeeID", "EmployeeName")
            // .where("CompanyId")
            // .eq(CompanyId)
            res.status(200).json({
                data: result,
                message:"attendance data"
            })
        }
        catch(error)
        {
            res.status(500).json(error)
        }
     }


     let fetchAttendanceByMonthAndYear = async(req,res)=>
     {
        try{

        
        const {CompanyId, EmployeeID, month,year} = req.body
        if (!CompanyId || !EmployeeID || !month || !year) 
        {
            res.status(400).json("All fields are required")

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
                      fromMonth: { $month: "$AttendanceDate" },
                      fromYear: { $year: "$AttendanceDate" },
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
                      as: "AttendanceData",
                    },
                  },
                  {
                    $unwind: {
                      path: "$AttendanceData",
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      AttendanceDate: 1,
                      InPunchTime: 1,
                      OutPunchTime: 1,
                      EmployeeID: {
                        _id: "$EmployeeData._id",
                        EmployeeName: "$AttendanceData.EmployeeName",
                      },
                    },
                  },
                ];

              const  result = await Attendance.aggregate(pipeline)

               res.status(200).json({
                data:result,
                 message:"fetch attendance"
            })
        }
        catch(error)
        {
            console.log(error)
            res.status(500).json(error)
        }
            
        }
     
export {AddAttendance, fetchAttendance, fetchAttendaceByEmployeeID,fetchAttendanceByMonthAndYear }