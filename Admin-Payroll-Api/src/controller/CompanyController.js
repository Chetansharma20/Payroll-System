import { Company } from "../models/CompanySchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// -------------------- Add Company --------------------
let AddCompany = async (req, res) => {
  const reqData = req.body;
  console.log("CompanyData", reqData);

  try {
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(reqData.CompanyPassword, salt);

    // Create company, default role is 'Company'
    const result = await Company.create({
      ...reqData,
      CompanyPassword: encryptPassword,
      role: reqData.role || "Company",
    });

    res.status(200).json({
      data: {
        _id: result._id,
        CompanyName: result.CompanyName,
        CompanyEmail: result.CompanyEmail,
        CompanyIsActive: result.CompanyIsActive,
        role: result.role,
      },
      message: "Company added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// -------------------- Company Login --------------------
let CompanyLogin = async (req, res) => {
  try {
    const { CompanyEmail, CompanyPassword } = req.body;

    const logedUser = await Company.findOne({ CompanyEmail });
    if (!logedUser) {
      return res.status(400).json({ message: "Company not registered" });
    }

    // Verify role
    if (logedUser.role !== "Company") {
      return res.status(403).json({ message: "Access denied: Not a company account" });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(CompanyPassword, logedUser.CompanyPassword);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: logedUser._id,
        email: logedUser.CompanyEmail,
        role: logedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      data: {
        _id: logedUser._id,
        CompanyName: logedUser.CompanyName,
        CompanyEmail: logedUser.CompanyEmail,
        role: logedUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// -------------------- Fetch Companies --------------------
let fetchCompany = async (req, res) => {
  try {
    const result = await Company.find().select("-CompanyPassword"); // exclude password
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// -------------------- Update Company --------------------
let UpdateCompany = async (req, res) => {
  const { CompanyId, CompanyIsActive } = req.body;

  try {
    const result = await Company.findByIdAndUpdate(
      { _id: CompanyId },
      { CompanyIsActive },
      { new: true }
    ).select("-CompanyPassword"); // exclude password

    res.status(200).json({
      data: result,
      message: "Company updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export { AddCompany, fetchCompany, UpdateCompany, CompanyLogin };
