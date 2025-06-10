import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';

const middleware = [thunk, logger];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;