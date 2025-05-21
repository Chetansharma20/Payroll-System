import express from "express";
import { AddBank, FetchBank } from "../controller/BankController.js";

let BankRouter = express.Router()

BankRouter.get("/fetchbank", FetchBank)
BankRouter.post("addbank", AddBank)

export{BankRouter}