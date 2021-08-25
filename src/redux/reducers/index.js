import { combineReducers } from 'redux'
import { usersReducers } from './usersReducers'

const reducers = combineReducers({
  allUsers: usersReducers,
})

export default reducers
