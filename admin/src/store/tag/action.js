import * as constants from './constants';

export const getTag = () => ({
  type: constants.GET_TAG
})

export const addTag = (data) => ({
  type: constants.ADD_ONE,
  data
})

export const removeOne = (_id) => ({
  type: constants.REMOVE_ONE,
  _id
})

export const changeOne = (data) => ({
  type: constants.CHANGE_ONE,
  data
})
