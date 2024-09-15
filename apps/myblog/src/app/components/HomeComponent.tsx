import { ExternalLink, HomeData } from "@souhailelk/myblog.domain";
import { useEffect, useState } from "react";
import HomeDataRepository from "../repositories/HomeDataRepositroy";

function MyLinks(props:{links:ExternalLink[]}) {
    let Linksdivs: React.JSX.Element[] = []
    props.links.forEach(link => {
        Linksdivs.push(
            <div key={link.url} className="m-3">
                <a href={link.url}>
                    <img className="object-contain h-10" alt={link.title} src={link.iconUrl} />
                </a>
            </div>
        )
    });
    return (
        <div>
            <div className="text-center font-sans text-sm md:text-xl font-black">Let's get social</div>
            <div className="flex justify-center">
                {Linksdivs}
            </div>
        </div>
    );
}

function HomeComponent() {
    const [homeData, setHomeData] = useState<HomeData>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchArticles = async () => {
        try {
          let repository = new HomeDataRepository();
          const response = await repository.getData();
          setHomeData(response);
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
    if (!homeData) {
      return <div>Article not found</div>;
    }
    return (
        <div className="p-2">
                <div className="m-auto max-w-full md:max-w-lg overflow-hidden">
                    <img className="object-cover w-full" alt="Home" src={homeData.bodyImageUrl} />
                </div>
                <div className="m-auto max-w-full md:max-w-lg overflow-hidden">
                    <div className="px-4 py-2">
                        <p className="font-mono text-xl md:text-2xl font-black">
                            {homeData.title}
                        </p>
                        <div className="block font-sans text-justify text-lg md:text-xl text-left px-4 py-2" dangerouslySetInnerHTML={{ __html: homeData.bodyContent }}>
                        </div>
                    </div>
                    <MyLinks links={homeData.externalLinks} />
                </div>
        </div>
    );
}

export default HomeComponent;
