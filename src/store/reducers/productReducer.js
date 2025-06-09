import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_SINGLE_PRODUCT_REQUEST,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_FAILURE,
} from '../actions/productActions';

const initialState = {
  productList: [],
  totalProducts: 0,
  activeProduct: null,
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: action.payload.products,
        totalProducts: action.payload.total,
        error: null,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        productList: [],
        totalProducts: 0,
      };

    case FETCH_SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        activeProduct: null,
      };
    case FETCH_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        activeProduct: action.payload,
      };
    case FETCH_SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;