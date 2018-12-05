import * as constants from './constants';

export const initWork = (data) => ({
  type: constants.INIT_WORK,
  data
})

export const addWork = (data) => ({
  type: constants.ADD_WORK,
  data
})

export const deleteWork = (_id) => ({
  type: constants.DELETE_WORK,
  _id
})

export const changeWork = (data) => ({
  type: constants.CHANGE_WORK,
  data
})