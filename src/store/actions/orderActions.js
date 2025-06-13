import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { clearCart } from './shoppingCartActions';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

export const createOrder = (orderData, history) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const response = await axiosInstance.post('/order', orderData);
        
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
        
        dispatch(clearCart());
        
        toast.success("Siparişiniz başarıyla oluşturuldu!");
        history.push('/order-success');

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Sipariş oluşturulurken bir hata oluştu.";
        dispatch({ type: CREATE_ORDER_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
    }
};