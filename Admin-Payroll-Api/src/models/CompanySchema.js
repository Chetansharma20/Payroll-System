import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    CompanyEmail: {
      type: String,
      required: [true, "Company email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    CompanyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: [3, "Company name must be at least 3 characters long"],
      maxlength: [50, "Company name cannot exceed 50 characters"],
    },

    CompanyAddress: {
      type: String,
      required: [true, "Company address is required"],
      trim: true,
      minlength: [5, "Address should have at least 5 characters"],
    },

    // RegistrationNo: {
    //   type: String,
    //   required: [true, "Registration number is required"],
    //   trim: true,
    //   unique: true,
    //   match: [/^[A-Z0-9-]+$/, "Registration number must be alphanumeric"],
    // },

    CompanyCity: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    CompanyState: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },

    CompanyIsActive: {
      type: Boolean,
      default: false,
    },

    CompanyPassword: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [100, "Password cannot exceed 100 characters"],
      trim: true,
    },

    role: {
      type: String,
      enum: ["Company", "Admin", "SuperAdmin"],
      default: "Company",
    },
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", CompanySchema);
