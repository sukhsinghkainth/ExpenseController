// user.routes.ts
import express, { Request, Response } from 'express';
import  addSampleData  from "../../services/expenService";
import getuser from "../../services/getalldata"
const router = express.Router();

// Add a route to add sample data
router.get('/addSampleData', addSampleData);
router.get("/user/:userId",getuser)

export default router;
