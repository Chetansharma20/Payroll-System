import express from "express"
import { AddBranch, DeleteBranch, fetchBranch, getBranchByCompany, UpdateBranch } from "../controller/BranchController.js"

let BranchRouter = express.Router()



BranchRouter.get("/fetchbranch", fetchBranch)
BranchRouter.post("/addbranch", AddBranch)
BranchRouter.put("/updatebranch", UpdateBranch)
BranchRouter.post("/getbranchbycompany", getBranchByCompany)
BranchRouter.delete("/deletebranch", DeleteBranch)

export {BranchRouter}