import store from '../store'
import { toast } from 'react-toastify'
import { ActionTypes } from '../constants/action-types'

// Carga del Storage
export const setUserList = (users) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USERS_LIST,
      payload: users
    })
  }
}

export const addUser = (user) => {
  const localStorageUsers = JSON.parse(localStorage.getItem('users-list')),
    users = [ user, ...localStorageUsers ]
    
  localStorage.setItem('users-list', JSON.stringify(users))

  return (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_USER,
      payload: users
    })
    toast.success('User added successfully!');
  }
}

export const editUser = (user_email, user) => {
  const users = store.getState().allUsers.users,
    usersFiltered = users.filter(item => item.email !== user_email),
    newList = [ user, ...usersFiltered ]

  localStorage.setItem('users-list', JSON.stringify(newList))

  return (dispatch) => {
    dispatch({
      type: ActionTypes.EDIT_USER,
      payload: newList
    })
    toast.info('User modified successfully!');
  }
}

export const getUser = (user_email) => {
  const users = store.getState().allUsers.users,
    newUser = users.filter(item => item.email === user_email)

  return (dispatch) => {
    dispatch({
      type: ActionTypes.GET_USER,
      payload: newUser
    })
  }

}

export const removeUser = (user_email) => {
  const users = store.getState().allUsers.users,
    newList = users.filter(item => item.email !== user_email)

  localStorage.setItem('users-list', JSON.stringify(newList))

  return (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_USER,
      payload: newList
    })
    toast.error('User removed successfully!');
  }
}
