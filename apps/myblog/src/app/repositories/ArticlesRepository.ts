import {Article} from '@souhailelk/myblog.domain';
import IArticlesRepository from "./IArticlesRepository";
import axios from 'axios';

class ArticlesRepository implements IArticlesRepository {
  private uri:string = 'https://souhailelk-backend-b5a5f23638f7.herokuapp.com/';
  async getAllArticles(): Promise<Article[]> {
    const val = await axios.get(this.uri+"Articles")
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.error(error)
      });

    const articles: Article[] = [];
    val.forEach((element: { id: string; title: string; content: React.JSX.Element; date: Date; }) => {
      articles.push(new Article(element.id, element.title, element.content, element.date, []))
    });
   return articles;
  }
  async getArticleById(id:string): Promise<Article> {
    const val = await axios.get(this.uri+"Articles/"+id)
      .then(response => {
        return response.data[0]
      })
      .catch(error => {
        console.error(error)
      });
    return val;
  }

}
export default ArticlesRepository;