import React from "react";
import {Article} from "@souhailelk/myblog.domain";
import { format } from 'date-fns';
import { Link } from "react-router-dom";

function ArticleCardComponent(props: { article: Article; }) {
    const { article } = props;
    const tags: React.JSX.Element[] = []
    if (article.tags)
        article.tags.forEach(tag =>
            tags.push(<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-3">#{tag}</span>));
    else
        tags.push(<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-3">#</span>);
    return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-2" >
                <Link to={"/Article/" + article.id}>
                    <img alt="ArticleCardComponent" className="object-cover w-full h-48 hover:shadow-xl" src={article.mainImageUrl} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{article.title}</div>
                        <div className="flex text-xs tracking-widest break-words">{format(article.date,'MMMM do, yyyy')}</div>
                    </div>
                </Link>
                <div className="px-6 py-4">{tags}</div>
            </div>
    )
}

export default ArticleCardComponent;