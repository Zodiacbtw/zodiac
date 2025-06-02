import axiosInstance from "../../api/axiosInstance";

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (data) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: data,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProducts = (queryParams = {}) => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await axiosInstance.get('/products', { params: queryParams });
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