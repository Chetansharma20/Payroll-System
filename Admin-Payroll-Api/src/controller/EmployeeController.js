import { Employee } from "../models/EmployeeSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// -------------------- Cloudinary Setup --------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "EmployeeDocs",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});

export const upload = multer({ storage });

// -------------------- Add Employee --------------------
let AddEmployee = async (req, res) => {
  try {
    const {
      EmployeeName,
      EmployeeEmail,
      EmployeeDesignation,
      EmployeeCity,
      EmployeeState,
      EmployeePincode,
      EmployeeAddress,
      EmployeeGender,
      EmployeeDepartment,
      EmployeeJoiningDate,
      EmployeeDOB,
      EmployeeType,
      EmployeePassword,
      CompanyId,
      EmployeePhoneNo,
      BranchName,
      BranchId,
    } = req.body;
console.log(req.body)
    const EmployeePhoto = req.files?.EmployeePhoto?.[0]?.path || null;
    const AdhaarCard = req.files?.AdhaarCard?.[0]?.path || null;
    const PanCard = req.files?.PanCard?.[0]?.path || null;
    const PassBook = req.files?.PassBook?.[0]?.path || null;
    const Degree = req.files?.Degree?.[0]?.path || null;

    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(EmployeePassword, salt);

    const result = await Employee.create({
      EmployeeName,
      EmployeeAddress,
      EmployeeCity,
      EmployeeDepartment,
      EmployeeDesignation,
      EmployeeEmail,
      EmployeeGender,
      EmployeePincode,
      EmployeeState,
      EmployeePhoto,
      AdhaarCard,
      PanCard,
      PassBook,
      Degree,
      EmployeeJoiningDate,
      EmployeeDOB,
      EmployeeType,
      CompanyId,
      EmployeePhoneNo,
      BranchName,
      BranchId,
      EmployeePassword: encryptPassword,
      role: "Employee",
    });
console.log(result)
    res.status(200).json({
      data: {
        _id: result._id,
        EmployeeName: result.EmployeeName,
        EmployeeEmail: result.EmployeeEmail,
        role: result.role,
        CompanyId: result.CompanyId,
      },
      message: "Employee added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// -------------------- Employee Login --------------------
let EmployeeLogin = async (req, res) => {
  try {
    const { EmployeeEmail, EmployeePassword } = req.body;
    const loggedUser = await Employee.findOne({ EmployeeEmail }).populate("CompanyId");

    if (!loggedUser) return res.status(400).json({ message: "Employee not registered" });

    const isValidPassword = await bcrypt.compare(EmployeePassword, loggedUser.EmployeePassword);
    if (!isValidPassword) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: loggedUser._id, email: loggedUser.EmployeeEmail, role: loggedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      data: {
        _id: loggedUser._id,
        EmployeeName: loggedUser.EmployeeName,
        EmployeeEmail: loggedUser.EmployeeEmail,
        role: loggedUser.role,
        CompanyId: loggedUser.CompanyId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// -------------------- Fetch Employees --------------------
let fetchEmployee = async (req, res) => {
  try {
    const result = await Employee.find().populate("CompanyId").select("-EmployeePassword");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


let UpdateEmployee = async (req, res) => {
  try {
    const { EmployeeID } = req.body;
        console.log("Body:", req.body);
console.log("Files:", req.files);
    // Validate EmployeeID
    if (!EmployeeID) {
      return res.status(400).json({ message: "EmployeeID is required" });
    }

    // Check if employee exists
    const employee = await Employee.findById(EmployeeID);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Build update object from uploaded files
    const updatedFields = {};
    
    if (req.files) {
      ["EmployeePhoto", "AdhaarCard", "PanCard", "PassBook", "Degree"].forEach((field) => {
        if (req.files[field] && req.files[field][0]) {
          updatedFields[field] = req.files[field][0].path;
        }
      });
    }

    // Check if any files were uploaded
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Update employee
    const result = await Employee.findByIdAndUpdate(
      EmployeeID, 
      updatedFields, 
      { new: true }
    ).select("-EmployeePassword");

    if (!result) {
      return res.status(404).json({ message: "Failed to update employee" });
    }

    res.status(200).json({
      data: result,
      message: "Employee documents updated successfully",
    });


  } catch (error) {
    console.error("Error updating employee documents:", error);
    res.status(500).json({ 
      message: "Upload failed", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// -------------------- Delete Employee --------------------
let DeleteEmployee = async (req, res) => {
  try {
    const { EmployeeId } = req.body;
    await Employee.findByIdAndDelete(EmployeeId);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

// -------------------- Get Employees by Company --------------------
let getEmployeeByCompany = async (req, res) => {
  try {
    const { CompanyId } = req.body;
    const result = await Employee.find({ CompanyId }).select("-EmployeePassword");
    res.status(200).json({ data: result, message: "Employees fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

export { AddEmployee, fetchEmployee, UpdateEmployee, DeleteEmployee, getEmployeeByCompany, EmployeeLogin };
