import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';

export const fetchCards = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/user/card');
        dispatch({ type: FETCH_CARDS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_CARDS_FAILURE, payload: error.message });
        toast.error("Kayıtlı kartlar yüklenemedi.");
    }
};

export const addCard = (cardData) => async (dispatch) => {
    try {
        await axiosInstance.post('/user/card', cardData);
        toast.success("Kart başarıyla eklendi!");
        dispatch(fetchCards());
    } catch (error) {
        toast.error("Kart eklenirken bir hata oluştu.");
    }
};

export const updateCard = (cardData) => async (dispatch) => {
    try {
        await axiosInstance.put('/user/card', cardData);
        toast.success("Kart başarıyla güncellendi!");
        dispatch(fetchCards());
    } catch (error) {
        toast.error("Kart güncellenirken bir hata oluştu.");
    }
};

export const deleteCard = (cardId) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/user/card/${cardId}`);
        toast.success("Kart başarıyla silindi!");
        dispatch(fetchCards());
    } catch (error) {
        toast.error("Kart silinirken bir hata oluştu.");
    }
};