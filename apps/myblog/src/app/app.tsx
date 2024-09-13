import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import Page404Component from './components/Page404Component';
import NavigationBarComponent from './components/NavigationBarComponent';
import ResumeComponent from './components/ResumeComponent';
import ArticlesComponent from './components/ArticlesComponent';
import ArticleComponent from './components/ArticleComponent';
import { NavigationBarItem } from '@souhailelk/myblog.domain';
import EditArticleComponent from './components/EditArticleComponent';
function App() {
  const navigationBarItems: NavigationBarItem[] = [
    new NavigationBarItem('Home', '/'),
    new NavigationBarItem('Resume', '/Resume'),
    new NavigationBarItem('Articles', '/Articles'),
  ];
  return (
    <div className="h-screen w-sceen">
      <BrowserRouter>
        <NavigationBarComponent navigationBarItems={navigationBarItems} />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/Article/:id" element={<ArticleComponent />} />
          <Route path="/EditArticle/:id" element={<EditArticleComponent />} />
          <Route path="/Resume" element={<ResumeComponent />} />
          <Route path="/Articles" element={<ArticlesComponent />} />
          <Route path="*" element={<Page404Component />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
