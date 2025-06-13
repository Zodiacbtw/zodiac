import axiosInstance from '../../api/axiosInstance'; 
import { toast } from 'react-toastify';

export const FETCH_ADDRESSES_SUCCESS = 'FETCH_ADDRESSES_SUCCESS';
export const FETCH_ADDRESSES_FAILURE = 'FETCH_ADDRESSES_FAILURE';

export const fetchAddresses = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/user/address');
        dispatch({ type: FETCH_ADDRESSES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ADDRESSES_FAILURE, payload: error.message });
        toast.error("Addresses could not be loaded.");
    }
};

export const addAddress = (addressData) => async (dispatch) => {
    try {
        await axiosInstance.post('/user/address', addressData);
        toast.success("Address added successfully!");
        dispatch(fetchAddresses());
    } catch (error) {
        toast.error("An error occurred while adding the address.");
    }
};

export const updateAddress = (addressData) => async (dispatch) => {
    try {
        await axiosInstance.put('/user/address', addressData);
        toast.success("Address updated successfully!");
        dispatch(fetchAddresses());
    } catch (error) {
        toast.error("An error occurred while updating the address.");
    }
};

export const deleteAddress = (addressId) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/user/address/${addressId}`);
        toast.success("Address deleted successfully!");
        dispatch(fetchAddresses());
    } catch (error) {
        toast.error("An error occurred while deleting the address.");
    }
};