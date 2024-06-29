export class Article {
    id: string;
    title: string;
    content: React.JSX.Element;
    date: Date;
    tags: string[];
    mainImageUrl:string
    constructor(id:string, title:string, content:React.JSX.Element, date:Date, mainImageUrl:string, tags:string[]) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.tags = tags;
        this.mainImageUrl = mainImageUrl;
    }
}