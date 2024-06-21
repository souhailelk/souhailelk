import { RequestHandler } from 'express';
import { ResumeDatabase } from '../database/ResumeDataBase';


const resumeDatabase:ResumeDatabase = new ResumeDatabase();

export const getResume: RequestHandler = async (req, res) => {
  try {
    const resume = await resumeDatabase.getResume();
    res.status(200).json(resume);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: `${error}` });
  }
};