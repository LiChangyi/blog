import { fromJS } from 'immutable';
import * as constants from './constants';
const defaultState = fromJS({
  isRequest: true,
  data: []
})

export default ( state = defaultState, action) => {
  const oldData = JSON.parse(JSON.stringify(state.get('data')));
  switch (action.type) {
    case constants.INITTAG:
      const data = action.data;
      return state.merge({
        isRequest: false,
        data
      })
    case constants.ADD_ONE:
      return state.merge({
        isRequest: false,
        data: [...oldData, action.data]
      })
    case constants.REMOVE_ONE:
      return state.merge({
        isRequest: false,
        data: oldData.filter( item => {
          return item._id !== action._id;
        })
      })
    case constants.CHANGE_ONE:
      const index = oldData.findIndex( item => {
        return item._id === action.data._id;
      })
      oldData.splice(index, 1, action.data)
      return state.merge({
        isRequest: false,
        data: oldData
      })
    default:
      return state;
  }
}