import { combineReducers } from 'redux';
import { reducer as userReducer } from './user';
import { reducer as tagReducer } from './tag';
import { reducer as workReducer } from './work';

const reducer = combineReducers({
  user: userReducer,
  tag: tagReducer,
  work: workReducer
})

export default reducer;