import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
 CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ Missing",
  API_SECRET: process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Missing",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "EmployeeDocs",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});

export const upload = multer({ storage });
