import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './routes';

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
        {
          routes.map(item => (
            <Route { ...item } />
          ))
        }
        <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default App;
