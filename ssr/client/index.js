import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { getClientStore } from './store';

const Root = () => (
  <Provider store={ getClientStore() }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reactDom.hydrate(<Root />, document.getElementById('root'));
