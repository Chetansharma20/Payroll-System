import mongoose from "mongoose"
import { SalarySettings } from "../models/SalarySettingsSchema.js"
import { SalarySlip } from "../models/SalarySlipSchema.js"


// let AddSalarySlip = async (req, res)=>
// {
//     let reqData = req.body
//     console.log("SalaryHeadsData",reqData)
//     try
//     {
//         let result =  await SalarySlip.create(reqData)

//         res.status(200).json({
//             data: result,
//             message: "Salary Slip Added Successfully"
//         })
//     }
//     catch(error)
//     {
//         console.log(error)
//         res.status(500).json(error)

//     }


// }
// let fetchSalarySlipByEmployee = async (req,res)=>
//     {
//         try
//         {
//             let { EmployeeID} = req.body
//             let result = await SalarySlip.find({ EmployeeID: EmployeeID}).populate("EmployeeID","EmployeeName")
//             // .where("CompanyId")
//             // .eq(CompanyId)
//             res.status(200).json(
//                { data: result,
//                 message:"Salary Slip"
//          } )

//         }
//         catch(error)
//         {
//             res.status(500).json(error)

//         }

//     }
 
// import { SalarySlip } from "../model/SalarySlipSchema.js";


// let createSalaryslip = async (req, res) => {
//     let reqdata = req.body
//     console.log("salaryslip", reqdata)
//     try {
//         let result = await SalarySlip.create(reqdata)
//         res.status(200).json({
//             data: result,
//             message: "Salary setting added successfully"
//         })

//     } catch (error) {
//         res.status(500).json(error)
//     }
// }
// add the genrate salary slip funtion


// add the genrate salary slip funtion
// const calculateSalaryDetailed = async (req, res) => {
//     const { CompanyId, EmployeeID, Month } = req.body;
//     console.log(req.body);

//     try {
//         // Check if salary slip already exists for this employee and month
//         const existingSlip = await SalarySlip.findOne({
//             CompanyId,
//             EmployeeID,
//             Month
//         });

//         if (existingSlip) {
//             return res.status(400).json({
//                 message: `Salary slip for EmployeeID ${EmployeeID} for Month ${Month} has already been generated`
//             });
//         }


//         // Continue with your current aggregation and calculation
//         const result = await SalarySettings.aggregate([
//             {
//                 $match: {
//                     CompanyId: new mongoose.Types.ObjectId(CompanyId),
//                     EmployeeID: new mongoose.Types.ObjectId(EmployeeID),
//                 },
//             },
//             { $unwind: "$SalaryHeads" },
//             {
//                 $lookup: {
//                     from: "salaryheads",
//                     localField: "SalaryHeads.SalaryHeadId",
//                     foreignField: "_id",
//                     as: "salaryHeadDetails",
//                 },
//             },
//             { $unwind: "$salaryHeadDetails" },
//             {
//                 $addFields: {
//                     headType: "$salaryHeadDetails.SalaryHeadsType",
//                     title: "$salaryHeadDetails.SalaryHeadsTitle",
//                     shortName: "$salaryHeadDetails.ShortName",
//                     amount: "$SalaryHeads.applicableValue",
//                 },
//             },
//             {
//                 $facet: {
//                     Earnings: [
//                         { $match: { headType: "Earnings" } },
//                         {
//                             $group: {
//                                 _id: null,
//                                 heads: {
//                                     $push: {
//                                         title: "$title",
//                                         shortName: "$shortName",
//                                         amount: "$amount",
//                                     },
//                                 },
//                                 total: { $sum: "$amount" },
//                             },
//                         },
//                     ],
//                     Deductions: [
//                         { $match: { headType: "Deductions" } },
//                         {
//                             $group: {
//                                 _id: null,
//                                 heads: {
//                                     $push: {
//                                         title: "$title",
//                                         shortName: "$shortName",
//                                         amount: "$amount",
//                                     },
//                                 },
//                                 total: { $sum: "$amount" },
//                             },
//                         },
//                     ],
//                 },
//             },
//             {
//                 $project: {
//                     Earnings: { $arrayElemAt: ["$Earnings.heads", 0] },
//                     Deductions: { $arrayElemAt: ["$Deductions.heads", 0] },
//                     totalEarnings: {
//                         $ifNull: [{ $arrayElemAt: ["$Earnings.total", 0] }, 0],
//                     },
//                     totalDeductions: {
//                         $ifNull: [{ $arrayElemAt: ["$Deductions.total", 0] }, 0],
//                     },
//                 },
//             },
//             {
//                 $addFields: {
//                     grossSalary: "$totalEarnings",
//                     netSalary: { $subtract: ["$totalEarnings", "$totalDeductions"] },
//                 },
//             },
//         ]);

//         const salResult = await SalarySlip.create({
//             EmployeeID: EmployeeID,
//             CompanyId: CompanyId,
//             Deductions: result[0].Deductions,
//             Earnings: result[0].Earnings,
//             totalEarnings: result[0].totalEarnings,
//             totalDeductions: result[0].totalDeductions,
//             grossSalary: result[0].grossSalary,
//             netSalary: result[0].netSalary,
//             Month: Month,
//         });

//         return res.status(200).json({
//             message: "Salary Slip Generated",
//             data: salResult,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// };

// const calculateSalarybycompany = async (req, res) => {
//     const { CompanyId, Month } = req.body;
//     console.log(req.body);

//     try {
//         const result = await SalarySettings.aggregate([
//             {
//                 $match: {
//                     CompanyId: new mongoose.Types.ObjectId(CompanyId),
//                 },
//             },
//             { $unwind: "$SalaryHeads" },
//             {
//                 $lookup: {
//                     from: "salaryheads",
//                     localField: "SalaryHeads.SalaryHeadId",
//                     foreignField: "_id",
//                     as: "salaryHeadDetails",
//                 },
//             },
//             { $unwind: "$salaryHeadDetails" },
//             {
//                 $addFields: {
//                     headType: "$salaryHeadDetails.SalaryHeadsType",
//                     title: "$salaryHeadDetails.SalaryHeadsTitle",
//                     shortName: "$salaryHeadDetails.ShortName",
//                     amount: "$SalaryHeads.applicableValue",
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$EmployeeID",
//                     EmployeeID: { $first: "$EmployeeID" },
//                     CompanyId: { $first: "$CompanyId" },
//                     Earnings: {
//                         $push: {
//                             $cond: [
//                                 { $eq: ["$headType", "Earnings"] },
//                                 { title: "$title", shortName: "$shortName", amount: "$amount" },
//                                 "$$REMOVE"
//                             ]
//                         }
//                     },
//                     Deductions: {
//                         $push: {
//                             $cond: [
//                                 { $eq: ["$headType", "Deductions"] },
//                                 { title: "$title", shortName: "$shortName", amount: "$amount" },
//                                 "$$REMOVE"
//                             ]
//                         }
//                     },
//                     totalEarnings: {
//                         $sum: {
//                             $cond: [{ $eq: ["$headType", "Earnings"] }, "$amount", 0]
//                         }
//                     },
//                     totalDeductions: {
//                         $sum: {
//                             $cond: [{ $eq: ["$headType", "Deductions"] }, "$amount", 0]
//                         }
//                     }
//                 }
//             },
//             {
//                 $addFields: {
//                     grossSalary: "$totalEarnings",
//                     netSalary: { $subtract: ["$totalEarnings", "$totalDeductions"] },
//                 },
//             },
//         ]);

//         console.log(result);

//         const allSlips = [];

//         for (let emp of result) {
//             try {
//                 const salResult = await SalarySlip.create({
//                     EmployeeID: emp.EmployeeID,
//                     CompanyId: emp.CompanyId,
//                     Deductions: emp.Deductions,
//                     Earnings: emp.Earnings,
//                     totalEarnings: emp.totalEarnings,
//                     totalDeductions: emp.totalDeductions,
//                     grossSalary: emp.grossSalary,
//                     netSalary: emp.netSalary,
//                     Month:Month
//                 });
//                 allSlips.push(salResult);
//             } catch (error) {
//                 console.log(`Failed for employee ${emp.EmployeeID}: ${error.message}`);
//             }
//         }

//         return res.status(200).json({
//             message: "Salary Slips Generated for All Employees",
//             data: allSlips
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// };


// let getSalaryslip = async (req, res) => {

//     try {
//         let result = await SalarySlip.find()
//         res.status(200).json(
//             {data:result}
//         )
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

// let getSalaryslipByCompany = async (req, res) => {

//     let {CompanyId} = req.body
//     try {
//         let result = await SalarySlip.find({CompanyId}).populate("EmployeeID", "EmployeeName" )
//         res.status(200).json({data:result})
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }


let fetchSalarySlipByEmployee = async (req, res) => {
  try {
    const { EmployeeID } = req.body;
    const result = await SalarySlip.find({ EmployeeID }).populate("EmployeeID", "EmployeeName");
    res.status(200).json({ data: result, message: "Salary Slip" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ------------------ SINGLE EMPLOYEE ------------------
const calculateSalaryDetailed = async (req, res) => {
  const { CompanyId, EmployeeID, Month } = req.body;
  try {
    // Check if salary slip already exists
    const existingSlip = await SalarySlip.findOne({ CompanyId, EmployeeID, Month });
    if (existingSlip) {
      return res.status(400).json({
        message: `Salary slip for EmployeeID ${EmployeeID} for Month ${Month} has already been generated`,
      });
    }

    // Fetch salary settings for the employee
   const salarySettings = await SalarySettings.findOne({ CompanyId, EmployeeID })
  .sort({ EffectFrom: -1, createdAt: -1 }) // 🔥 ensures the newest salary setting is picked
  .populate("SalaryHeads.SalaryHeadId");


    if (!salarySettings) return res.status(404).json({ message: "Salary settings not found" });

    let totalEarnings = 0;
    let totalDeductions = 0;
    const Earnings = [];
    const Deductions = [];

    // Find base salary (assuming head type "Basic" exists)
    const basicHead = salarySettings.SalaryHeads.find(h => h.SalaryHeadId?.SalaryHeadsTitle === "Basic");
    const baseSalary = basicHead?.applicableValue || 0;

    for (const head of salarySettings.SalaryHeads) {
      const salaryHead = head.SalaryHeadId;

      // Calculate amount
      let amount = 0;
      if (head.applicableValue) amount = head.applicableValue;
      else if (head.percentage) amount = (head.percentage / 100) * baseSalary;

      if (salaryHead.SalaryHeadsType === "Earnings") {
        totalEarnings += amount;
        Earnings.push({ title: salaryHead.SalaryHeadsTitle, shortName: salaryHead.ShortName, amount });
      } else {
        totalDeductions += amount;
        Deductions.push({ title: salaryHead.SalaryHeadsTitle, shortName: salaryHead.ShortName, amount });
      }
    }

    const salResult = await SalarySlip.create({
      EmployeeID,
      CompanyId,
      Deductions,
      Earnings,
      totalEarnings,
      totalDeductions,
      grossSalary: totalEarnings,
      netSalary: totalEarnings - totalDeductions,
      Month,
    });

    return res.status(200).json({ message: "Salary Slip Generated", data: salResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// ------------------ ALL EMPLOYEES ------------------
const calculateSalarybycompany = async (req, res) => {
  const { CompanyId, Month } = req.body;
  try {
    // Fetch all salary settings for the company
    const employeesSettings = await SalarySettings.find({ CompanyId }).populate("SalaryHeads.SalaryHeadId");

    const allSlips = [];

    for (const salarySettings of employeesSettings) {
      // Check duplicate slip
      const exists = await SalarySlip.findOne({ CompanyId, EmployeeID: salarySettings.EmployeeID, Month });
      if (exists) continue;

      let totalEarnings = 0;
      let totalDeductions = 0;
      const Earnings = [];
      const Deductions = [];

      const basicHead = salarySettings.SalaryHeads.find(h => h.SalaryHeadId?.SalaryHeadsTitle === "Basic");
      const baseSalary = basicHead?.applicableValue || 0;

      for (const head of salarySettings.SalaryHeads) {
        const salaryHead = head.SalaryHeadId;
        let amount = 0;
        if (head.applicableValue) amount = head.applicableValue;
        else if (head.percentage) amount = (head.percentage / 100) * baseSalary;

        if (salaryHead.SalaryHeadsType === "Earnings") {
          totalEarnings += amount;
          Earnings.push({ title: salaryHead.SalaryHeadsTitle, shortName: salaryHead.ShortName, amount });
        } else {
          totalDeductions += amount;
          Deductions.push({ title: salaryHead.SalaryHeadsTitle, shortName: salaryHead.ShortName, amount });
        }
      }

      const salResult = await SalarySlip.create({
        EmployeeID: salarySettings.EmployeeID,
        CompanyId,
        Deductions,
        Earnings,
        totalEarnings,
        totalDeductions,
        grossSalary: totalEarnings,
        netSalary: totalEarnings - totalDeductions,
        Month,
      });

      allSlips.push(salResult);
    }

    return res.status(200).json({ message: "Salary Slips Generated for All Employees", data: allSlips });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// ------------------ FETCH ALL SLIPS ------------------
let getSalaryslip = async (req, res) => {
  try {
    let result = await SalarySlip.find();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json(error);
  }
};

let getSalaryslipByCompany = async (req, res) => {
  const { CompanyId } = req.body;
  try {
    const result = await SalarySlip.find({ CompanyId }).populate("EmployeeID", "EmployeeName");
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteSalarySlip = async (req, res) => {
  try {
    const { SalarySlipId } = req.body; // expecting ID from frontend
    const result = await SalarySlip.findByIdAndDelete(SalarySlipId);

    if (!result) {
      return res.status(404).json({ message: "Salary Slip not found" });
    }

    res.status(200).json({
      message: "Salary Slip Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting Salary Slip", error });
  }
};

export {
  getSalaryslip,
  calculateSalaryDetailed,
  fetchSalarySlipByEmployee,
  getSalaryslipByCompany,
  calculateSalarybycompany,
  deleteSalarySlip
};

// let getsalaryslipbyEmployee= async (req, res) => {
//  let { EmployeeId } = req.body;
//     try {
//         let result = await SalarySlip.find(EmployeeId)
//         res.status(200).json(result)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// 
// export { getSalaryslip, calculateSalaryDetailed , fetchSalarySlipByEmployee, getSalaryslipByCompany,calculateSalarybycompany}

    