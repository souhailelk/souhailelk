import { DatabaseClient } from './DatabaseClient';
import { Article } from '@souhailelk/myblog.domain';
export class ArticleDatabase {
  async getArticles():Promise<Article[]> {
    const database = await DatabaseClient.getClient();
    const articlesDB = database.collection<Article>('Articles');
    return await articlesDB.find().toArray();
  }

  async getArticle(id: string):Promise<Article[]> {
    const database = await DatabaseClient.getClient();
    const articlesDB = database.collection<Article>('Articles');
    return await articlesDB.find({ id: id }).toArray();
  }
}
