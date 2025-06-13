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
        toast.error("Saved cards could not be loaded.");
    }
};

export const addCard = (cardData) => async (dispatch) => {
    try {
        await axiosInstance.post('/user/card', cardData);
        toast.success("Card added successfully!");
        dispatch(fetchCards());
    } catch (error) {
        toast.error("An error occurred while adding the card.");
    }
};

export const updateCard = (cardData) => async (dispatch) => {
    try {
        await axiosInstance.put('/user/card', cardData);
        toast.success("Card updated successfully!");
        dispatch(fetchCards());
    } catch (error) {
        toast.error("An error occurred while updating the card.");
    }
};

export const deleteCard = (cardId) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/user/card/${cardId}`);
        toast.success("Card deleted successfully!");
        dispatch(fetchCards());
    } catch (error) {
        toast.error("An error occurred while deleting the card.");
    }
};