import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import promise from "redux-promise";
import createLogger from 'redux-logger';
import reducer from "./reducers";

const logger = createLogger();

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk, promise, logger),
));
