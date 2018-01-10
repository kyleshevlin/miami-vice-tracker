import * as types from '../constants/actionTypes'

export const addGroup = group => ({
  type: types.ADD_GROUP,
  group
})

export const editGroup = (id, update) => ({
  type: types.EDIT_GROUP,
  id,
  update
})

export const deleteGroup = id => ({
  type: types.DELETE_GROUP,
  id
})
