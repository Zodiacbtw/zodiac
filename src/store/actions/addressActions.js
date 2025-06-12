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
        toast.error("Adresler yüklenemedi.");
    }
};

export const addAddress = (addressData) => async (dispatch) => {
    try {
        await axiosInstance.post('/user/address', addressData);
        toast.success("Adres başarıyla eklendi!");
        dispatch(fetchAddresses());
    } catch (error) {
        toast.error("Adres eklenirken bir hata oluştu.");
    }
};

export const updateAddress = (addressData) => async (dispatch) => {
    try {
        await axiosInstance.put('/user/address', addressData);
        toast.success("Adres başarıyla güncellendi!");
        dispatch(fetchAddresses());
    } catch (error) {
        toast.error("Adres güncellenirken bir hata oluştu.");
    }
};

export const deleteAddress = (addressId) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/user/address/${addressId}`);
        toast.success("Adres başarıyla silindi!");
        dispatch(fetchAddresses());
    } catch (error) {
        toast.error("Adres silinirken bir hata oluştu.");
    }
};