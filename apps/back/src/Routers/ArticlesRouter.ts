import express from "express";
import { getArticleById, getArticles, putArticle } from "../controllers/ArticleController";


export const ArticlesRouter = express.Router();
ArticlesRouter.get('/', getArticles);
ArticlesRouter.get('/:id', getArticleById);
ArticlesRouter.put('/:id',putArticle)