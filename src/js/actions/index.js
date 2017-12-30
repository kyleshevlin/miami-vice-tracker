import * as types from '../constants/actionTypes'

export function requestItems() {
  return {
    type: types.REQUEST_ITEMS
  }
}

export function receiveItemsSuccess(items) {
  return {
    type: types.RECEIVE_ITEMS_SUCCESS,
    items
  }
}

export function receiveItemsFail(error) {
  return {
    type: types.RECEIVE_ITEMS_FAIL,
    error
  }
}

export function fetchItems() {
  return dispatch => {
    dispatch(requestItems)

    fetch(/* url */).then(
      response => {
        dispatch(receiveItemsSuccess(response.json().items))
      },
      error => {
        dispatch(receiveItemsFail(error))
      }
    )
  }
}

export function addItem(item) {
  return {
    type: types.ADD_ITEM,
    item
  }
}

export function editItem(id, update) {
  return {
    type: types.EDIT_ITEM,
    id,
    update
  }
}

export function updateCurrentUser(user) {
  return {
    type: types.UPDATE_CURRENT_USER,
    user
  }
}
