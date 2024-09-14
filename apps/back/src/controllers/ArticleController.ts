import { RequestHandler } from 'express';
import { ArticleDatabase } from '../database/ArticleDataBase';
import { Article } from '@souhailelk/myblog.domain';


const articleDatabase:ArticleDatabase = new ArticleDatabase();

export const getArticles: RequestHandler = async (req, res) => {
  try {
    const articles = await articleDatabase.getArticles();
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: `${error}` });
  }
};
export const getArticleById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    if (!req.params.id.match(/[0-9]+/)) {
      return res
        .status(400)
        .send({ error: 'Article id incorrect', details: '' });
    }
    const article = await articleDatabase.getArticle(req.params.id);
    articleDatabase
    return res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: `${error}` });
  }
};


export const putArticle: RequestHandler = async (req, res) => {
  try {
    console.log("Received message");
    if (!req.body.article.id.match(/[0-9]+/)) {
      return res
        .status(400)
        .send({ error: 'Article id incorrect', details: '' });
    } 
    const updateResult = await articleDatabase.putArticle(req.body.article);
    if (updateResult.modifiedCount > 0) {
    return res.status(200).json(updateResult);}
    else res
    .status(300)
    .json({ error: 'Article Not Found', details: `${updateResult}` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: `${error}` });
  }
};
