import { Department } from "../models/DepartmentSchema.js";

const AddDepartment = async (req, res) => {
  try {
    const { DepartmentName, CompanyId, DepartmentIsActive } = req.body;

    if (!DepartmentName || !CompanyId) {
      return res.status(400).json({
        message: "DepartmentName and CompanyId are required."
      });
    }

    const existing = await Department.findOne({
      DepartmentName: { $regex: new RegExp(`^${DepartmentName}$`, "i") },
      CompanyId
    });

    if (existing) {
      return res.status(400).json({
        message: "Department with this name already exists for this company."
      });
    }

    const department = await Department.create({
      DepartmentName,
      CompanyId,
      DepartmentIsActive: DepartmentIsActive ?? true
    });

    res.status(200).json({
      data: department,
      message: "Department added successfully"
    });
  } catch (error) {
    console.error("Error adding department:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const FetchDepartment = async (req, res) => {
  try {
    const result = await Department.find().populate("CompanyId", "CompanyName");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

 const FetchDepartmentByCompany = async (req, res) => {
  try {
    const { CompanyId } = req.body;
    const result = await Department.find({ CompanyId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};


// ----------------------------
// Delete Department
// ----------------------------
const DeleteDepartment = async (req, res) => {
  try {
    const { DepartmentId } = req.body;

    if (!DepartmentId) {
      return res.status(400).json({
        message: "DepartmentId is required."
      });
    }

    // Optional: Validate ObjectId if using MongoDB
    if (!DepartmentId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid DepartmentId."
      });
    }

    const deleted = await Department.findByIdAndDelete(DepartmentId);

    if (!deleted) {
      return res.status(404).json({
        message: "Department not found."
      });
    }

    res.status(200).json({
      data: deleted,
      message: "Department deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};




export { AddDepartment, FetchDepartment, FetchDepartmentByCompany, DeleteDepartment };
