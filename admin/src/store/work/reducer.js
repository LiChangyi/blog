import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  isRequest: true,
  data: []
})

export default ( state = defaultState, action = {} ) => {
  const oldData = state.get('data');
  if ( action.type === constants.INIT_WORK ) {
    return state.merge({
      isRequest: false,
      data: action.data
    })
  }
  
  if ( action.type === constants.ADD_WORK ) {
    return state.merge({
      isRequest: false,
      data: [...oldData, action.data]
    })
  }

  if ( action.type === constants.DELETE_WORK ) {
    return state.merge({
      isRequest: false,
      data: oldData.filter( item => {
        return item._id !== action._id;
      })
    })
  }

  if ( action.type === constants.CHANGE_WORK ) {
    const index = oldData.findIndex( item => {
      return item._id === action.data._id;
    })
    oldData.splice(index, 1, action.data);
    return state.merge({
      isRequest: false,
      data: oldData
    })
  }

  return state;
}