import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer';

export const getStore = () => (
  createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
);

export const getClientStore = () => {
  const defaultStore = window.MY_SSR_DATA.state;
  return createStore(reducer, defaultStore, composeWithDevTools(applyMiddleware(thunk)));
};

export default { getStore, getClientStore };
