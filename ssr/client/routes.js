import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Archives from './pages/Archives';
import Article from './pages/Article';

export default [
  {
    path: '/',
    component: Home,
    key: 'home',
    exact: true,
    loadData: Home.loadData
  }, {
    path: '/work',
    key: 'work',
    component: Work,
    loadData: Work.loadData
  }, {
    path: '/archives',
    key: 'archives',
    component: Archives,
    loadData: Archives.loadData
  }, {
    path: '/about',
    component: About,
    key: 'about',
    loadData: About.loadData
  }, {
    path: '/article/:id',
    component: Article,
    key: 'article',
    loadData: Article.loadData
  }
];
