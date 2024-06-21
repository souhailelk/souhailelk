import express from "express";
import { getResume } from "../controllers/ResumeController";


export const ResumeRouter = express.Router();
ResumeRouter.get('/', getResume);