import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger"
import GraphReducer from '../reducer/GraphReducer';


export default createStore(combineReducers({
  GraphReducer
}),
  {},
  applyMiddleware(logger)
);