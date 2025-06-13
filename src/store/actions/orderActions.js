import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { clearCart } from './shoppingCartActions';
import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
    FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE
} from './actionTypes';

export const fetchOrders = () => async (dispatch) => {
    dispatch({ type: FETCH_ORDERS_REQUEST });
    try {
        const response = await axiosInstance.get('/order');
        dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Orders could not be loaded.";
        dispatch({ type: FETCH_ORDERS_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
    }
};

export const createOrder = (orderData, history) => async (dispatch, getState) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const currentCart = getState().shoppingCart.cart;
        const checkedItems = currentCart.filter(item => item.checked);

        const apiPayload = {
            ...orderData,
            products: checkedItems.map(item => ({
                product_id: item.product.id,
                count: item.count,
                detail: item.product.name.substring(0, 50),
            })),
        };
        
        const response = await axiosInstance.post('/order', apiPayload);

        const enrichedOrderPayload = {
            ...response.data,
            products: checkedItems.map(item => ({
                ...item.product,
                count: item.count,
            })),
        };

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: enrichedOrderPayload });
        
        dispatch(clearCart());
        toast.success("Your order has been placed successfully!");
        history.push('/order-success');

    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred while creating the order.";
        dispatch({ type: CREATE_ORDER_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
    }
};