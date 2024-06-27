import { RequestHandler } from 'express';
import { HomeDatabase } from '../database/HomeDataBase';


const homeDatabase:HomeDatabase = new HomeDatabase();

export const getHomeData: RequestHandler = async (req, res) => {
  try {
    const homeData = await homeDatabase.getData();
    res.status(200).json(homeData);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: `${error}` });
  }
};