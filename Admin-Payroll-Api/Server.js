import express from "express";
import bodyParser from "body-parser";
import { connectToDatabase } from "./src/DB/PayrollDB.js ";
import { CompanyRouter } from "./src/routes/CompanyRouter.js";
import { BranchRouter } from "./src/routes/BranchRouter.js";
import { EmployeeRouter } from "./src/routes/EmployeeRouter.js";

import { SalaryHeadsRouter } from "./src/routes/SalaryHeadsRouter.js";
import { LeaveRouter } from "./src/routes/LeaveRouter.js";
import { AttendanceRouter } from "./src/routes/AttendanceRouter.js";
import { BankRouter } from "./src/routes/BankRouter.js";
import cors from "cors"
import { DepartmnetRouter } from "./src/routes/DepartmentRoutes.js";
import { DesignationRouter } from "./src/routes/DesignationRoutes.js";
import { OverviewRouter } from "./src/routes/overviewRouter.js";


let Server = express()

Server.use(bodyParser.json())
Server.use(cors())
// calling DataBase
connectToDatabase()
Server.get("/", (req,res)=>
{
    res.send("hello guys...")
})

// connect routes with server
Server.use("/api", CompanyRouter)
Server.use("/api", BranchRouter)
Server.use("/api", EmployeeRouter)
Server.use("/api", SalaryHeadsRouter)
Server.use("/api", LeaveRouter)
Server.use("/api", AttendanceRouter)
Server.use("/api", BankRouter )
Server.use("/api", DepartmnetRouter)
Server.use("/api", DesignationRouter)
Server.use("/api", OverviewRouter)
Server.use("/UploadImages", express.static("UploadImages"))
 Server.listen(5000,()=>
{
    console.log("Server Started")

} )