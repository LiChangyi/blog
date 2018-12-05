import { createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { saga as tagSaga } from './tag';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer, 
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(tagSaga);

export default store;
