// import multer from "multer";
// import path from "path";


// let imageStorage = multer.diskStorage({
//     destination: (req,file,next)=>
//     {
//         next(null, "UploadImages")
//     },
//     filename:(req,file,next)=>
//     {
//         next(null, `${req.body.EmployeeName}${path.extname(file.originalname)}`)
//     }
// })
// export const Upload = multer({storage: imageStorage})

import multer from "multer";
import path from "path";

let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "UploadImages");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

export const Upload = multer({ storage: imageStorage });
