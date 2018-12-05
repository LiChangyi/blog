import * as constants from './constants';

export const setUserInfo = (userInfo) => ({
  type: constants.SET_USERINFO,
  userInfo
})