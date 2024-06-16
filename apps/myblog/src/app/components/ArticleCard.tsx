import React from "react";
import Article from "../models/Article";
import { format } from 'date-fns';
import { Link } from "react-router-dom";

function ArticleCard(props: { article: Article; }) {
    const { article } = props;
    const tags: React.JSX.Element[] = []
    article.tags.forEach(tag =>
        tags.push(<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-3">#{tag}</span>));
    return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-2" >
                <Link to={"/Article/" + article.id}>
                    <img alt="ArticleCard" className="object-cover w-full h-48 hover:shadow-xl" src="https://picsum.photos/600/400/?random" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{article.title}</div>
                        <div className="flex text-xs tracking-widest break-words">{format(article.date,'MMMM do, yyyy')}</div>
                    </div>
                </Link>
                <div className="px-6 py-4">{tags}</div>
            </div>
    )
}

export default ArticleCard;