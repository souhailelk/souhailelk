import {Article} from '@souhailelk/myblog.domain';

interface IArticlesRepository {
    getAllArticles(): Promise<Article[]>
}
export default IArticlesRepository; 