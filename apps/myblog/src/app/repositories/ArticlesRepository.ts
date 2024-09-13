import {Article} from '@souhailelk/myblog.domain';
import axios from 'axios';

class ArticlesRepository {
  private uri:string = 'http://localhost:3333/';
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
  async putArticle(article: Article): Promise<Article> {
    console.log("I'm in putArticle method")
    // Ensure that only serializable fields are included
  const sanitizedArticle = {
    id: article.id,
    title: article.title,
    content: typeof article.content === 'string' ? article.content : '', // Ensure content is a string
    date: article.date, // assuming article.date is a valid date object or string
    mainImageUrl: article.mainImageUrl,
    tags: article.tags
  };
    const reqBody = {article:sanitizedArticle};
    const val = await axios.put(this.uri+"Articles/"+article.id,reqBody)
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