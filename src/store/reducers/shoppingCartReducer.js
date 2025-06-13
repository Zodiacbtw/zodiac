import {
  SET_CART, SET_PAYMENT, SET_ADDRESS, ADD_TO_CART, REMOVE_FROM_CART,
  UPDATE_CART_ITEM_COUNT, TOGGLE_CART_ITEM_CHECKED,
  APPLY_DISCOUNT, REMOVE_DISCOUNT, CLEAR_CART
} from '../actions/shoppingCartActions';

const initialState = {
  cart: [],
  payment: {},
  address: {},
  discount: null,
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };

    case ADD_TO_CART: {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItemIndex > -1) {
        const updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, count: item.count + action.payload.count }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        const newItem = {
          product: action.payload.product,
          count: action.payload.count,
          checked: true,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }
    
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };

    case UPDATE_CART_ITEM_COUNT: {
      const { productId, count } = action.payload;
      if (count <= 0) {
           return {
              ...state,
              cart: state.cart.filter((item) => item.product.id !== productId),
          };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === productId ? { ...item, count: count } : item
        ),
      };
    }

    case TOGGLE_CART_ITEM_CHECKED: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        ),
      };
    }
      
    case APPLY_DISCOUNT:
      return {
        ...state,
        discount: action.payload,
      };

    case REMOVE_DISCOUNT:
      return {
        ...state,
        discount: null,
      };
      
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        discount: null,
      };

    default:
      return state;
  }
};

export default shoppingCartReducer;