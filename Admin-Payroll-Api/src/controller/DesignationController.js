import { Designation } from "../models/DesignationSchema.js";

// 🟩 Add Designation
let AddDesignation = async (req, res) => {
  const reqdata = req.body;
  console.log("Designation Request:", reqdata);

  try {
    const { DesignationName,  CompanyId } = reqdata;

    // ✅ Validation checks
    if (!DesignationName || !CompanyId ) {
      return res.status(400).json({
        message: "DesignationName,  and CompanyId are required",
      });
    }

    // ✅ Create Designation
    const result = await Designation.create(reqdata);

    return res.status(200).json({
      data: result,
      message: "Designation added successfully",
    });
  } catch (error) {
    console.error("AddDesignation Error:", error);
    return res.status(500).json({
      message: "Something went wrong while adding Designation",
      error: error.message,
    });
  }
};

// 🟩 Fetch All Designations
let FetchDesignation = async (req, res) => {
  try {
    const result = await Designation.find()
      .populate("DepartmentId")
      .populate("CompanyId", "CompanyName");

    return res.status(200).json(result);
  } catch (error) {
    console.error("FetchDesignation Error:", error);
    return res.status(500).json({
      message: "Error fetching designations",
      error: error.message,
    });
  }
};

// 🟩 Fetch Designations by Company + Department
let FetchDesignationByCompany = async (req, res) => {
  try {
    const { CompanyId, DepartmentId } = req.body;

    // ✅ Validation
    if (!CompanyId) {
      return res.status(400).json({ message: "CompanyId is required" });
    }

    // ✅ Filter by both if DepartmentId is provided
    const query = DepartmentId ? { CompanyId, DepartmentId } : { CompanyId };

    const result = await Designation.find(query)
      
      .populate("CompanyId", "CompanyName");

    return res.status(200).json(result);
  } catch (error) {
    console.error("FetchDesignationByCompany Error:", error);
    return res.status(500).json({
      message: "Error fetching designations by company",
      error: error.message,
    });
  }
};


// ----------------------------
// Delete Designation
// ----------------------------
const DeleteDesignation = async (req, res) => {
  try {
    const { DesignationId } = req.body;

    if (!DesignationId) {
      return res.status(400).json({
        message: "DesignationId is required."
      });
    }

    // Optional: Validate ObjectId if using MongoDB
    if (!DesignationId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid DesignationId."
      });
    }

    const deleted = await Designation.findByIdAndDelete(DesignationId);

    if (!deleted) {
      return res.status(404).json({
        message: "Designation not found."
      });
    }

    res.status(200).json({
      data: deleted,
      message: "Designation deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting designation:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};



export { AddDesignation, FetchDesignation, FetchDesignationByCompany, DeleteDesignation };
