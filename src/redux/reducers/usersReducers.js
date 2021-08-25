import { ActionTypes } from '../constants/action-types'

const initialState = {
  users: [
    { name: "Juan", email: "arg@gmail.com", phone: "+543242343", country: "AR" },
    { name: "Leao", email: "salsa@gmail.com", phone: "+336724215", country: "BR" },
    { name: "Elpidio", email: "boliv@gmail.com", phone: "+456754324", country: "BO" },
    { name: "Michelle", email: "cl@gmail.com", phone: "+45467543", country: "CL" },
  ],
  user: [],
  editing: false,
}

export const usersReducers = (state = initialState, { type, payload }) => {

  switch (type) {

    case ActionTypes.SET_USERS_LIST:
      return { ...state, users: payload, editing: false }

    case ActionTypes.ADD_USER:
      return { users: payload, ...state }

    case ActionTypes.GET_USER:
      return { ...state, user: payload, editing: true }


    case ActionTypes.EDIT_USER:
      return { users: payload, ...state, user: [], editing: false }
    
    case ActionTypes.REMOVE_USER:
      return { ...state, users: payload }
    
    default:
      return state
  }
}
