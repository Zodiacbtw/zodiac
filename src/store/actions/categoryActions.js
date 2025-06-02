import axiosInstance from "../../api/axiosInstance";

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
    const response = await axiosInstance.get('/categories');
    dispatch(fetchCategoriesSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch categories";
    dispatch(fetchCategoriesFailure(errorMessage));
    console.error("Error fetching categories:", errorMessage);
  }
};