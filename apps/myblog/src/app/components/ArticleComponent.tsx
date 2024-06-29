import React, { useEffect, useState } from 'react'

import {Article} from '@souhailelk/myblog.domain';
import { useParams } from 'react-router-dom'
import { format } from 'date-fns';
import ArticlesRepository from '../repositories/ArticlesRepository';


function ArticleComponent() {
  type ArticleParam = { id: string };
  const { id } = useParams<ArticleParam>();
  const [article, setArticle] = useState<Article>();
  const [loading, setLoading] = useState(true);
  if (!id) {
    return <div>Article id incorrect...</div>;
  }
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let repository = new ArticlesRepository();
        const response = await repository.getArticleById(id);
        setArticle(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!article) {
    return <div>Article not found</div>;
  }
  const tags: React.JSX.Element[] = []
  if (article.tags)
    article.tags.forEach(tag =>
      tags.push(<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mt-3">#{tag}</span>));
  return (

    <div className="flex justify-center overflow-hidden rounded">
      <div className="box-content max-w-screen-lg shadow-lg px-6 py-4 overflow-auto">
        <img alt="Article" className="object-cover h-1/2 w-full" src={article.mainImageUrl} />
        <div className="font-bold justify-center text-2xl mm:text-4xl break-words">{article.title}</div>
        <div className="text-sm md:text-lg tracking-widest break-words ml-3 mb-3">published on {format(article.date, 'MMMM do, yyyy H:mm:ss a')}</div>
        <div className="text-gray-700 text-xs md:text-base leading-relaxed text-justify font-mono break-words px-2 py-6"><div dangerouslySetInnerHTML={{ __html: article.content }} /></div>
        <div className="px-6 py-4">{tags}</div>
      </div>
    </div>
  )
}

export default ArticleComponent;