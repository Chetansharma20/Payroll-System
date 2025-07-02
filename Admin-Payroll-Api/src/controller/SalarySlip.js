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
let fetchSalarySlipByEmployee = async (req,res)=>
    {
        try
        {
            let { EmployeeID} = req.body
            let result = await SalarySlip.find({ EmployeeID: EmployeeID}).populate("EmployeeID","EmployeeName")
            // .where("CompanyId")
            // .eq(CompanyId)
            res.status(200).json(
               { data: result,
                message:"Salary Slip"
         } )

        }
        catch(error)
        {
            res.status(500).json(error)

        }

    }
 
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
const calculateSalaryDetailed = async (req, res) => {
    const { CompanyId, EmployeeID, Month } = req.body
    console.log(req.body)
    try {
        const result = await SalarySettings.aggregate([
            {
                $match: {
                    CompanyId: new mongoose.Types.ObjectId(CompanyId),
                    EmployeeID: new mongoose.Types.ObjectId(EmployeeID),
                },
            },
            { $unwind: "$SalaryHeads" },
            {
                $lookup: {
                    from: "salaryheads",
                    localField: "SalaryHeads.SalaryHeadId",
                    foreignField: "_id",
                    as: "salaryHeadDetails",
                },
            },
            { $unwind: "$salaryHeadDetails" },
            {
                $addFields: {
                    headType: "$salaryHeadDetails.SalaryHeadsType",
                    title: "$salaryHeadDetails.SalaryHeadsTitle",
                    shortName: "$salaryHeadDetails.ShortName",
                    amount: "$SalaryHeads.applicableValue",
                },
            },
            {
                $facet: {
                    Earnings: [
                        { $match: { headType: "Earnings" } },
                        {
                            $group: {
                                _id: null,
                                heads: {
                                    $push: {
                                        title: "$title",
                                        shortName: "$shortName",
                                        amount: "$amount",
                                    },
                                },
                                total: { $sum: "$amount" },
                            },
                        },
                    ],
                    Deductions: [
                        { $match: { headType: "Deductions" } },
                        {
                            $group: {
                                _id: null,
                                heads: {
                                    $push: {
                                        title: "$title",
                                        shortName: "$shortName",
                                        amount: "$amount",
                                    },
                                },
                                total: { $sum: "$amount" },
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    Earnings: { $arrayElemAt: ["$Earnings.heads", 0] },
                    Deductions: { $arrayElemAt: ["$Deductions.heads", 0] },
                    totalEarnings: {
                        $ifNull: [{ $arrayElemAt: ["$Earnings.total", 0] }, 0],
                    },
                    totalDeductions: {
                        $ifNull: [{ $arrayElemAt: ["$Deductions.total", 0] }, 0],
                    },
                },
            },
            {
                $addFields: {
                    grossSalary: "$totalEarnings",
                    netSalary: { $subtract: ["$totalEarnings", "$totalDeductions"] },
                },
            },
        ]);


        console.log(result);

        try {
            let salResult = await SalarySlip.create({
                EmployeeID: EmployeeID,
                CompanyId: CompanyId,
                Deductions: result[0].Deductions,
                Earnings: result[0].Earnings,
                totalEarnings: result[0].totalEarnings,
                totalDeductions: result[0].totalDeductions,
                grossSalary:  result[0].grossSalary,
                netSalary: result[0].netSalary,
               Month:Month
            })
            return res.status(200).json(
                {
                    message: "Salary Slip Generated",
                    data: salResult
                }
            );
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });

        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const calculateSalarybycompany = async (req, res) => {
    const { CompanyId, Month } = req.body;
    console.log(req.body);

    try {
        const result = await SalarySettings.aggregate([
            {
                $match: {
                    CompanyId: new mongoose.Types.ObjectId(CompanyId),
                },
            },
            { $unwind: "$SalaryHeads" },
            {
                $lookup: {
                    from: "salaryheads",
                    localField: "SalaryHeads.SalaryHeadId",
                    foreignField: "_id",
                    as: "salaryHeadDetails",
                },
            },
            { $unwind: "$salaryHeadDetails" },
            {
                $addFields: {
                    headType: "$salaryHeadDetails.SalaryHeadsType",
                    title: "$salaryHeadDetails.SalaryHeadsTitle",
                    shortName: "$salaryHeadDetails.ShortName",
                    amount: "$SalaryHeads.applicableValue",
                },
            },
            {
                $group: {
                    _id: "$EmployeeID",
                    EmployeeID: { $first: "$EmployeeID" },
                    CompanyId: { $first: "$CompanyId" },
                    Earnings: {
                        $push: {
                            $cond: [
                                { $eq: ["$headType", "Earnings"] },
                                { title: "$title", shortName: "$shortName", amount: "$amount" },
                                "$$REMOVE"
                            ]
                        }
                    },
                    Deductions: {
                        $push: {
                            $cond: [
                                { $eq: ["$headType", "Deductions"] },
                                { title: "$title", shortName: "$shortName", amount: "$amount" },
                                "$$REMOVE"
                            ]
                        }
                    },
                    totalEarnings: {
                        $sum: {
                            $cond: [{ $eq: ["$headType", "Earnings"] }, "$amount", 0]
                        }
                    },
                    totalDeductions: {
                        $sum: {
                            $cond: [{ $eq: ["$headType", "Deductions"] }, "$amount", 0]
                        }
                    }
                }
            },
            {
                $addFields: {
                    grossSalary: "$totalEarnings",
                    netSalary: { $subtract: ["$totalEarnings", "$totalDeductions"] },
                },
            },
        ]);

        console.log(result);

        const allSlips = [];

        for (let emp of result) {
            try {
                const salResult = await SalarySlip.create({
                    EmployeeID: emp.EmployeeID,
                    CompanyId: emp.CompanyId,
                    Deductions: emp.Deductions,
                    Earnings: emp.Earnings,
                    totalEarnings: emp.totalEarnings,
                    totalDeductions: emp.totalDeductions,
                    grossSalary: emp.grossSalary,
                    netSalary: emp.netSalary,
                    Month:Month
                });
                allSlips.push(salResult);
            } catch (error) {
                console.log(`Failed for employee ${emp.EmployeeID}: ${error.message}`);
            }
        }

        return res.status(200).json({
            message: "Salary Slips Generated for All Employees",
            data: allSlips
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


let getSalaryslip = async (req, res) => {

    try {
        let result = await SalarySlip.find()
        res.status(200).json(
            {data:result}
        )
    } catch (error) {
        res.status(500).json(error)
    }
}

let getSalaryslipByCompany = async (req, res) => {

    let {CompanyId} = req.body
    try {
        let result = await SalarySlip.find({CompanyId}).populate("EmployeeID", "EmployeeName" )
        res.status(200).json({data:result})
    } catch (error) {
        res.status(500).json(error)
    }
}

// let getsalaryslipbyEmployee= async (req, res) => {
//  let { EmployeeId } = req.body;
//     try {
//         let result = await SalarySlip.find(EmployeeId)
//         res.status(200).json(result)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// 
export { getSalaryslip, calculateSalaryDetailed , fetchSalarySlipByEmployee, getSalaryslipByCompany,calculateSalarybycompany}

    