// user.routes.ts
import express, { Request, Response } from 'express';
import  addSampleData  from "../../services/expenService";
import getuser from "../../services/getalldata"
import madeExpense from "../../services/expenses"

import createuser from "../../services/createuserService"

const router = express.Router();

// Add a route to add sample data
router.get('/addSampleData', addSampleData);
router.get("/expense/:username",madeExpense)
router.get("/user/:userId",getuser)
router.get("/createuser",createuser)


export default router;
