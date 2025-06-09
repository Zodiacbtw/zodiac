import axiosInstance from "../../api/axiosInstance";

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_SINGLE_PRODUCT_REQUEST = 'FETCH_SINGLE_PRODUCT_REQUEST';
export const FETCH_SINGLE_PRODUCT_SUCCESS = 'FETCH_SINGLE_PRODUCT_SUCCESS';
export const FETCH_SINGLE_PRODUCT_FAILURE = 'FETCH_SINGLE_PRODUCT_FAILURE';

export const fetchProductsRequest = () => ({ type: FETCH_PRODUCTS_REQUEST });
export const fetchProductsSuccess = (data) => ({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
export const fetchProductsFailure = (error) => ({ type: FETCH_PRODUCTS_FAILURE, payload: error });

export const fetchProducts = (queryParams = {}) => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const activeParams = {};
    for (const key in queryParams) {
      if (queryParams[key] !== undefined && queryParams[key] !== null && queryParams[key] !== '') {
        activeParams[key] = queryParams[key];
      }
    }
    const response = await axiosInstance.get('/products', { params: activeParams });
    if (response.data && Array.isArray(response.data.products) && typeof response.data.total === 'number') {
        dispatch(fetchProductsSuccess(response.data));
    } else {
        throw new Error("Invalid data structure received from /products endpoint");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch products";
    dispatch(fetchProductsFailure(errorMessage));
    console.error("Error fetching products:", errorMessage);
  }
};

export const fetchProductById = (productId) => async (dispatch) => {
  dispatch({ type: FETCH_SINGLE_PRODUCT_REQUEST });
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    dispatch({
      type: FETCH_SINGLE_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch product";
    dispatch({
      type: FETCH_SINGLE_PRODUCT_FAILURE,
      payload: errorMessage,
    });
    console.error(`Error fetching product with ID ${productId}:`, errorMessage);
  }
};