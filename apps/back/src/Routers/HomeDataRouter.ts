import express from "express";
import { getHomeData } from "../controllers/HomeDataController";


export const HomeDataRouter = express.Router();
HomeDataRouter.get('/', getHomeData);