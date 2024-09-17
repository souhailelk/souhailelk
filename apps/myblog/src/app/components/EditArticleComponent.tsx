import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import parse from "html-react-parser";
import { Article } from "@souhailelk/myblog.domain";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import ArticlesRepository from "../repositories/ArticlesRepository";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import "codemirror/theme/monokai.css";
import NotificationDialog from "./NotificationDialogComponent";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { AxiosError } from "axios";
const unescapeHtml = (htmlString: string) => {
  const temp = document.createElement("textarea");
  temp.innerHTML = htmlString;
  return temp.value;
};

function EditArticleComponent() {
  type ArticleParam = { id: string };
  const { id } = useParams<ArticleParam>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [content, setContent] = useState<React.JSX.Element>(<div></div>);
  const [contentString, setContentString] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [messageDialog, setMessageDialog] = useState<string>('');
  
  const handleClickOpen = (msg:string) => {
    setMessageDialog(msg);
    setOpenDialog(true);
  };

  // Function to handle the closing of the dialog
  const handleClose = () => {
    setOpenDialog(false);
  };
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
        setImage(a.mainImageUrl || "");
        setTitle(a.title || "");
        setDate(a.date ? new Date(a.date) : new Date());
        setContent(a.content || <div></div>);
        setContentString(ReactDOMServer.renderToString(a.content));
        console.log("Article fetched");
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
    article.tags.forEach((tag) => tags.push(<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mt-3">#{tag}</span>));
  }

  const labelStyle = "text-xl font-bold mb-2";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !image || !content) return;

    const jsx = parse(contentString) as React.JSX.Element;
    const modifiedArticle = new Article(id, title, jsx, date, image, article.tags);
    console.log("Sending modified article:", modifiedArticle);
    // Uncomment below line when repository is ready
    const res = await repository.putArticle(modifiedArticle);
    if(res instanceof AxiosError){
      const err = res as AxiosError;
      handleClickOpen(err.message);
      return;
    }
    handleClickOpen('saved successfully!')
  };

  return (
    <div className="flex h-screen">
      <div className="flex w-1/2 overflow-hidden">
      <div className="w-full h-full max-w-screen-xl shadow-lg px-6 py-4 overflow-auto">
        <form onSubmit={handleSubmit}>
          <label htmlFor="image" className={labelStyle}>
            Main Image:
          </label>
          <br />
          <textarea id="image" className="w-full box-border border border-gray-300" onChange={(e) => setImage(e.target.value)} value={image} />
          <br />

          <label htmlFor="title" className={labelStyle}>
            Title:
          </label>
          <br />
          <textarea
            id="title"
            className="w-full font-bold justify-center text-2xl mm:text-4xl break-words box-border border border-gray-300"
            onChange={(e) => setTitle(e.target.value)}
            value={title} // Use controlled input
          />
          <br />

          <label htmlFor="date" className={labelStyle}>
            Last modified date:
          </label>
          <br />
          <textarea id="date" className="w-full box-border border border-gray-300" readOnly value={format(date, "MMMM do, yyyy H:mm:ss a")} />
          <br />

          <label htmlFor="content" className={labelStyle}>
            Content:
          </label>
          <br />
          <CodeMirror
            value={unescapeHtml(contentString)}
            height="1000px"
            extensions={[html()]}
            theme="dark"
            onChange={(value: string) => {
              setContentString(ReactDOMServer.renderToString(value));
            }}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save
          </button>
          <br/>
        </form>
        </div>
      </div>
      <div className="flex w-1/2 overflow-hidden">
        <div className="w-full h-full max-w-screen-xl shadow-lg px-6 py-4 overflow-auto">
          <img alt="Article" className="w-full h-96 md:h-[600px] lg:h-[800px] object-cover" src={image} />
          <div className="font-bold justify-center text-6xl mm:text-4xl break-words">{title}</div>
          <div className="text-sm md:text-lg tracking-widest break-words ml-3 mb-3">published on {format(date, "MMMM do, yyyy H:mm:ss a")}</div>
          <div className="text-gray-700 text-xs md:text-base leading-relaxed text-justify font-mono break-words px-2 py-6">
            <div dangerouslySetInnerHTML={{ __html: parse(contentString) }} />
          </div>
          <div className="px-6 py-4">{tags}</div>
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Save status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {messageDialog}
          </DialogContentText>
        </DialogContent>
        {/* Simple close button inside dialog */}
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </Dialog>
    </div>
  );
}

export default EditArticleComponent;
