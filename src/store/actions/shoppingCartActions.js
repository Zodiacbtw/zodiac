export const SET_CART = 'SET_CART';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM_COUNT = 'UPDATE_CART_ITEM_COUNT';


export const setCart = (cartItems) => ({
  type: SET_CART,
  payload: cartItems,
});

export const setPayment = (paymentInfo) => ({
  type: SET_PAYMENT,
  payload: paymentInfo,
});

export const setAddress = (addressInfo) => ({
  type: SET_ADDRESS,
  payload: addressInfo,
});

export const addToCart = (product, count = 1) => ({
    type: ADD_TO_CART,
    payload: { product, count }
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId
});

export const updateCartItemCount = (productId, count) => ({
    type: UPDATE_CART_ITEM_COUNT,
    payload: { productId, count }
});