// import multer from "multer";
// import path from "path";

// let imageStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "UploadImages");
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = `${Date.now()}-${file.originalname}`;
//         cb(null, uniqueName);
//     }
// });

// export const Upload = multer({ storage: imageStorage });
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "employee_photos", // folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});

export const Upload = multer({ storage });
