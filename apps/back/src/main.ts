import express from 'express';
import cors from 'cors';
import { getArticles, getArticleById } from './controllers/ArticleController';


const app = express();
app.use(express.json());

app.use(cors()); // Use this after the variable declaration

const router = express.Router();
router.get('/', getArticles);
router.get('/:id', getArticleById);

app.use('/Articles', router);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`App running on http://localhost:` + port);
});
module.exports = app;
