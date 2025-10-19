import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  {
    DepartmentName: { type: String, required: true },
    CompanyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    DepartmentIsActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Department = mongoose.model("Department", DepartmentSchema);
