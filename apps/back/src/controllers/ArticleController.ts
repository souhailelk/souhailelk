import { Article } from '@souhailelk/myblog.domain';
import { RequestHandler } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
const getArticlesfromDB = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        'SELECT * FROM article',
        (error: any, results: { rows: Article[] }) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error('No results found'));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error('Internal server error');
  }
};

const getArticle = async (id: string) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `SELECT * FROM article WHERE id=${id}`,
        (error: any, results: { rows: Article[] }) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error('No results found'));
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
  }
};

export const getArticles: RequestHandler = async (req, res) => {
  try {
    const articles = await getArticlesfromDB();
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error', details:error });
  }
};
export const getArticleById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    if (!req.params.id.match(/[0-9]+/)) {
      return res.status(400).send({error: 'Article id incorrect', details: ''});;
    }
    const article = await getArticle(req.params.id);
    return res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error', details:`${error}` });
  }
};
