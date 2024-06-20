import { Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ArticleCardComponent from './ArticleCardComponent';
import {Article} from '@souhailelk/myblog.domain';
import ArticleComponent from './ArticleComponent';
import ArticlesRepository from '../repositories/ArticlesRepository';

function ArticlesComponent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let repository = new ArticlesRepository();
        const response = await repository.getAllArticles();
        setArticles(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  let ArticleCardComponents: React.JSX.Element[] = [];
  articles.forEach((article) =>
    ArticleCardComponents.push(<ArticleCardComponent article={article} />)
  );

  let ArticlesRoutes: React.JSX.Element[] = [];
  articles.forEach((article) =>
    ArticlesRoutes.push(
      <Route path={'/Article/' + article.id}>
        <ArticleComponent />
      </Route>
    )
  );
  return <div class="flex flex-wrap content-around items-center justify-center">{ArticleCardComponents}</div>;
}

export default ArticlesComponent;
