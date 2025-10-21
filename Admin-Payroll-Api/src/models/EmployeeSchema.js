import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    EmployeeName: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    EmployeeEmail: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    EmployeePhoneNo: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"],
      trim: true,
    },

    EmployeeAddress: {
      type: String,
      required: [true, "Address is required"],
      minlength: [5, "Address should have at least 5 characters"],
      trim: true,
    },

    EmployeeCity: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    EmployeeState: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },

    EmployeePincode: {
      type: Number,
      required: [true, "Pincode is required"],
      validate: {
        validator: function (v) {
          return /^[1-9][0-9]{5}$/.test(v);
        },
        message: "Enter a valid 6-digit pincode",
      },
    },

    EmployeeGender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Others"],
        message: "Select a correct gender",
      },
      required: [true, "Gender is required"],
    },

    EmployeePassword: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [100, "Password cannot exceed 100 characters"],
      trim: true,
    },

    EmployeeDOB: {
      type: Date,
      required: [true, "Date of Birth is required"],
      validate: {
        validator: (v) => v < new Date(),
        message: "DOB cannot be in the future",
      },
    },

    EmployeeJoiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
      validate: {
        validator: (v) => v <= new Date(),
        message: "Joining date cannot be in the future",
      },
    },

    EmployeeDesignation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },

    EmployeeDepartment: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },

    EmployeeType: {
      type: String,
      enum: {
        values: ["Full-Time", "Part-Time", "Intern", "Contract"],
        message: "Invalid employee type",
      },
      required: [true, "Employee type is required"],
    },

    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "BranchId is required"],
    },

    CompanyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "CompanyId is required"],
    },

    BranchName: {
      type: String,
      required: [true, "Branch name is required"],
      trim: true,
    },

    // Document URLs
    EmployeePhoto: { type: String },
    AdhaarCard: { type: String },
    PanCard: { type: String },
    PassBook: { type: String },
    Degree: { type: String },

    role: {
      type: String,
      enum: ["Employee", "Manager", "Admin"],
      default: "Employee",
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", EmployeeSchema);
