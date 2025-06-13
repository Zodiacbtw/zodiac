import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import productReducer from './productReducer';
import shoppingCartReducer from './shoppingCartReducer';
import categoryReducer from './categoryReducer';
import { addressReducer } from './addressReducer';
import { paymentReducer } from './paymentReducer';
import { orderReducer } from './orderReducer';

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  category: categoryReducer,
  address: addressReducer,
  payment: paymentReducer,
  order: orderReducer,
});

export default rootReducer;