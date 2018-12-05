import React,{ Component } from 'react';
import Layout from './components/Layout';
import './styles/common.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Tag from './pages/Tag';
import Article from './pages/Article';
import Work from './pages/Work';
import Writing from './pages/Writing';
import SetPage from './pages/Set';
import Upload from './pages/Upload';
import Login from './pages/Login';

class RouterDom extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Layout>
            <Switch>
              <Route exact path="/" component={ props => requireAuth(Article, props) }/>
              <Route path="/tag" component={ props => requireAuth(Tag, props) } />
              <Route path="/work" component={ props => requireAuth(Work, props) }/>
              <Route exact path="/writing" component={ props => requireAuth(Writing, props) }/>
              <Route path="/writing/:_id" component={ props => requireAuth(Writing, props) }/>
              <Route path="/set" component={ props => requireAuth(SetPage, props) }/>
              <Route path="/upload" component={ props => requireAuth(Upload, props) }/>
              <Redirect to="/" />
            </Switch>
          </Layout>
        </Switch>
      </Router>
    );
  }
}

function requireAuth(Layout, props) {
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || {};
  const { token = '' } = userInfo;
  const auth = token !== '' ? false : true;
  if ( auth ) { 
    return <Redirect to="/login" />;
  } else {
    return <Layout {...props} />
  }
}

export default RouterDom;