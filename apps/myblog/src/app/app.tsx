import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeComponent from './components/Home';
import Page404Component from './components/Page404';
import NavigationBarComponent from './components/NavigationBar';
import ResumeComponent from './components/Resume';
import ArticlesComponent from './components/Articles';
import ArticleComponent from './components/Article';
import NavigationBarItem from './models/NavigationBarItem';

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
          <Route path="/Resume" element={<ResumeComponent />} />
          <Route path="/Articles" element={<ArticlesComponent />} />
          <Route path="*" element={<Page404Component />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
