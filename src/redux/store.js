import { createStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk"
import reducers from './reducers'

// ** init middleware
const middleware = [thunk]

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// ** Create store
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(...middleware)))

export default store
