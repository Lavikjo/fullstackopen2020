import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import blogReducer from "./reducers/blogReducer"
import usersReducer from "./reducers/usersReducer"
import loginReducer from "./reducers/loginReducer"
import notificationReducer from "./reducers/notificationReducer"
import visibilityReducer from "./reducers/visibilityReducer"


const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  login: loginReducer,
  visibility: visibilityReducer,
  users: usersReducer })

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)))

export default store