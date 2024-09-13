import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';
import { Article } from '@souhailelk/myblog.domain';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import ArticlesRepository from '../repositories/ArticlesRepository';
import { Controlled as CodeMirror } from 'react-codemirror2';
// Import CodeMirror core styles
import 'codemirror/lib/codemirror.css';
// Import a theme (e.g., material)
import 'codemirror/theme/material.css';
// Import XML mode for CodeMirror
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript'; // Import JavaScript mode for JSX highlighting

const unescapeHtml = (htmlString:string) => {
  const temp = document.createElement("textarea");
  temp.innerHTML = htmlString;
  return temp.value;
};

function ArticleComponent() {
  type ArticleParam = { id: string };
  const { id } = useParams<ArticleParam>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [content, setContent] = useState<React.JSX.Element>(<div></div>);
  const [contentString, setContentString] = useState<string>('');
  
  if (!id) {
    return <div>Article id incorrect...</div>;
  }

  let repository = new ArticlesRepository();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const a = await repository.getArticleById(id);
        setArticle(a);
        // Set individual state fields based on the fetched article
        setImage(a.mainImageUrl || '');
        setTitle(a.title || '');
        setDate(a.date ? new Date(a.date) : new Date());
        setContent(a.content || <div></div>);
        setContentString((ReactDOMServer.renderToString(a.content)))
        console.log('Article fetched');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]); // Only run when 'id' changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  const tags: React.JSX.Element[] = [];
  if (article.tags) {
    article.tags.forEach(tag =>
      tags.push(
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mt-3">
          #{tag}
        </span>
      )
    );
  }

  const labelStyle = 'text-xl font-bold mb-2';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !image || !content) return;

    const jsx = parse(contentString) as React.JSX.Element;
    const modifiedArticle = new Article(id, title, jsx, date, image, article.tags);
    console.log('Sending modified article:', modifiedArticle);
    // Uncomment below line when repository is ready
     await repository.putArticle(modifiedArticle);
  };
  
  return (
    <div className="justify-center overflow-hidden rounded">
      <div className="box-content max-w-screen-lg shadow-lg px-6 py-4 overflow-auto">
        <form onSubmit={handleSubmit}>
          <label htmlFor="image" className={labelStyle}>
            Main Image:
          </label>
          <br />
          <textarea
            id="image"
            className="w-full h-full box-border border border-gray-300"
            onChange={(e) => setImage(e.target.value)}
            value={image} // Use controlled input
          />
          <br />

          <label htmlFor="title" className={labelStyle}>
            Title:
          </label>
          <br />
          <textarea
            id="title"
            className="w-full h-full font-bold justify-center text-2xl mm:text-4xl break-words box-border border border-gray-300"
            onChange={(e) => setTitle(e.target.value)}
            value={title} // Use controlled input
          />
          <br />

          <label htmlFor="date" className={labelStyle}>
            Last modified date:
          </label>
          <br />
          <textarea
            id="date"
            className="w-full h-full box-border border border-gray-300"
            readOnly
            value={format(date, 'MMMM do, yyyy H:mm:ss a')}
          />
          <br />

          <label htmlFor="content" className={labelStyle}>
            Content:
          </label>
          <br />
          <CodeMirror
        value={unescapeHtml(contentString)} // Set the current XML content
        options={{
          mode: 'javascript', // Set mode to XML
          theme: 'material', // You can use other themes as well
          lineNumbers: true, // Show line numbers in the editor
          tabSize: 2,
        }}
        onChange={(_editor, _data, value) => {
          setContentString(ReactDOMServer.renderToString(value));
        }}
        onBeforeChange={(_editor, _data, value) => {
          setContentString(ReactDOMServer.renderToString(value));
        }}
      />
          <br />
          <br />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <br/>
          <div className="text-gray-700 text-xs md:text-base leading-relaxed text-justify font-mono break-words px-2 py-6"><div dangerouslySetInnerHTML={{ __html: parse(contentString) }} /></div>
        </form>
      </div>
    </div>
  );
}

export default ArticleComponent;
