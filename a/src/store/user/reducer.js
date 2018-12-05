import { fromJS } from 'immutable';
import * as constants from './constants';
const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || {};
const defaultState = fromJS({
  _id: userInfo._id || '',
  userId: userInfo.userId || '',
  name: userInfo.name || '',
  token: userInfo.token || ''
})

export default ( state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_USERINFO:
      window.sessionStorage.setItem("userInfo", JSON.stringify(action.userInfo));
      return state.merge({
        _id: fromJS(action.userInfo._id),
        userId: fromJS(action.userInfo.userId),
        name: fromJS(action.userInfo.name),
        token: fromJS(action.userInfo.token),
      })
    default:
      return state;
  }
}