import mongoose from "mongoose";
import { Branch } from "../models/BranchSchema.js";

// ----------------------------
// Add Branch
// ----------------------------
const AddBranch = async (req, res) => {
  try {
    const { BranchName, CompanyId, BranchAddress, BranchIsActive, BranchCity, BranchState } = req.body;

    // ✅ Required fields validation
    if (!BranchName || !CompanyId || !BranchAddress) {
      return res.status(400).json({
        success: false,
        message: "BranchName, CompanyId, and BranchLocation are required"
      });
    }

    // ✅ Validate CompanyId
    if (!mongoose.Types.ObjectId.isValid(CompanyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid CompanyId"
      });
    }

    // ✅ Default BranchIsActive to true if not provided
    const isActive = BranchIsActive !== undefined ? BranchIsActive : true;

    const newBranch = await Branch.create({
      BranchName,
      CompanyId,
      BranchAddress,
      BranchIsActive: isActive,
      BranchCity,
       BranchState

    });

    res.status(201).json({
      success: true,
      data: newBranch,
      message: "Branch added successfully"
    });
  } catch (error) {
    console.error("Error adding branch:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ----------------------------
// Fetch All Branches
// ----------------------------
const fetchBranch = async (req, res) => {
  try {
    const branches = await Branch.find().sort({ BranchName: 1 }); // optional sort
    res.status(200).json({
      success: true,
      data: branches,
      message: branches.length ? "Branches fetched successfully" : "No branches found"
    });
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ----------------------------
// Update Branch
// ----------------------------
const UpdateBranch = async (req, res) => {
  try {
    const { BranchId, BranchIsActive } = req.body;

    if (!BranchId || BranchIsActive === undefined) {
      return res.status(400).json({
        success: false,
        message: "BranchId and BranchIsActive are required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(BranchId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid BranchId"
      });
    }

    const updatedBranch = await Branch.findByIdAndUpdate(
      BranchId,
      { BranchIsActive },
      { new: true }
    );

    if (!updatedBranch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedBranch,
      message: "Branch updated successfully"
    });
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ----------------------------
// Get Branches by Company
// ----------------------------
const getBranchByCompany = async (req, res) => {
  try {
    const { CompanyId } = req.body;

    if (!CompanyId) {
      return res.status(400).json({
        success: false,
        message: "CompanyId is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(CompanyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid CompanyId"
      });
    }

    const branches = await Branch.find({ CompanyId }).sort({ BranchName: 1 });

    res.status(200).json({
      success: true,
      data: branches,
      message: branches.length ? "Branches fetched successfully" : "No branches found for this company"
    });
  } catch (error) {
    console.error("Error fetching branches by company:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// ----------------------------
// Delete Branch
// ----------------------------
const DeleteBranch = async (req, res) => {
  try {
    const { BranchId } = req.body;

    if (!BranchId) {
      return res.status(400).json({
        success: false,
        message: "BranchId is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(BranchId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid BranchId"
      });
    }

    const deletedBranch = await Branch.findByIdAndDelete(BranchId);

    if (!deletedBranch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found"
      });
    }

    res.status(200).json({
      success: true,
      data: deletedBranch,
      message: "Branch deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export { AddBranch, fetchBranch, UpdateBranch, getBranchByCompany, DeleteBranch };
