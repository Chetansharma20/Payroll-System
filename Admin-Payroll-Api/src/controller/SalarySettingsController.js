import { SalarySettings } from "../models/SalarySettingsSchema.js"

let AddSalarySettings = async (req, res) => {
    let reqData = req.body
    console.log("SalaryHeadsData", reqData)

    // Conditional: Check required fields
    if (!reqData.CompanyId || !reqData.EmployeeID) {
        return res.status(400).json({ message: "CompanyId and EmployeeID are required" })
    }

    try {
        let result = await SalarySettings.create(reqData)
        res.status(200).json({
            data: result,
            message: "Salary Settings Added Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to add salary settings", error })
    }
}

let fetchSalarySettingsByEmployee = async (req, res) => {
    let { CompanyId, EmployeeID } = req.body

    // Conditional: Validate input
    if (!CompanyId || !EmployeeID) {
        return res.status(400).json({ message: "CompanyId and EmployeeID are required" })
    }

    try {
        let result = await SalarySettings.find({ CompanyId: CompanyId, EmployeeID: EmployeeID })
        res.status(200).json({
            data: result,
            message: "Salary settings fetched successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to fetch salary settings", error })
    }
}

let fetchSalarySettings = async (req, res) => {
    try {
        // Optional filtering by CompanyId query param
        const filter = req.query.CompanyId ? { CompanyId: req.query.CompanyId } : {}
        let result = await SalarySettings.find(filter)
        res.status(200).json({
            data: result,
            message: "Salary settings fetched successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to fetch salary settings", error })
    }
}

export { AddSalarySettings, fetchSalarySettingsByEmployee, fetchSalarySettings }
