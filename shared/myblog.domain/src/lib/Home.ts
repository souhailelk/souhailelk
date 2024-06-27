export class ExternalLink {
  url: string;
  title: string;
  iconUrl: string;
  constructor(url: string, title: string, iconUrl: string) {
    this.url = url;
    this.title = title;
    this.iconUrl = iconUrl;
  }
}

export class HomeData {
  title: string;
  bodyContent: React.JSX.Element;
  externalLinks: ExternalLink[];
  bodyImageUrl: string;
  constructor(
    title: string,
    bodyContent: React.JSX.Element,
    externalLinks: ExternalLink[],
    bodyImageUrl: string
  ) {
    this.title = title;
    this.bodyContent = bodyContent;
    this.externalLinks = externalLinks;
    this.bodyImageUrl = bodyImageUrl;
  }
}
