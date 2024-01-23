// user.routes.ts
import express, { Request, Response } from 'express';
import madeExpense from "../../services/expenses"
import createuser from "../../services/createuserService"

const router = express.Router();

// Add a route to add sample data

router.get("/expense/:username",madeExpense)
router.get("/createuser",createuser)


export default router;
