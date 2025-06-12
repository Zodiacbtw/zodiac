import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import productReducer from './productReducer';
import shoppingCartReducer from './shoppingCartReducer';
import categoryReducer from './categoryReducer';
import { addressReducer } from './addressReducer';

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  category: categoryReducer,
  address: addressReducer,
});

export default rootReducer;