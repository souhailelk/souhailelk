import {Article} from '@souhailelk/myblog.domain';
import axios from 'axios';

class ArticlesRepository {
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
    val.forEach((element: Article) => {
      articles.push(element)
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