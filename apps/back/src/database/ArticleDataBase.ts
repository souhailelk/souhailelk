import { UpdateResult } from 'mongodb';
import { DatabaseClient } from './DatabaseClient';
import { Article } from '@souhailelk/myblog.domain';
export class ArticleDatabase {
  async getArticles(): Promise<Article[]> {
    const database = await DatabaseClient.getClient();
    const articlesDB = database.collection<Article>('Articles');
    return await articlesDB.find().toArray();
  }

  async getArticle(id: string): Promise<Article[]> {
    const database = await DatabaseClient.getClient();
    const articlesDB = database.collection<Article>('Articles');
    return await articlesDB.find({ id: id }).toArray();
  }
  async putArticle(article: Article): Promise<UpdateResult<Article>> {
    const database = await DatabaseClient.getClient();
    const articlesDB = database.collection<Article>('Articles');
    return await articlesDB.updateOne(
      { id: article.id }, // Filter by article ID
      {
        $set: {
          title: article.title,
          content: article.content,
          date: article.date,
          mainImageUrl: article.mainImageUrl,
          tags: article.tags
        }
      }
    );
  }
}
