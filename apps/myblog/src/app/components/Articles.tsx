import { Route, BrowserRouter, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import Article from '../models/Article';
import ArticleComponent from '../components/Article';
import ArticlesRepository from '../repositories/ArticlesRepository';

function Articles() {
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
  let articleCards: React.JSX.Element[] = [];
  articles.forEach((article) =>
    articleCards.push(<ArticleCard article={article} />)
  );

  let ArticlesRoutes: React.JSX.Element[] = [];
  articles.forEach((article) =>
    ArticlesRoutes.push(
      <Route path={'/Article/' + article.id}>
        <ArticleComponent />
      </Route>
    )
  );
  return <div>{articleCards}</div>;
}

export default Articles;
