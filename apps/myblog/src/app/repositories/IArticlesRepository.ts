import Article from "../models/Article";

interface IArticlesRepository {
    getAllArticles(): Promise<Article[]>
}
export default IArticlesRepository; 