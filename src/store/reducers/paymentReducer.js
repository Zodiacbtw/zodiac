import { FETCH_CARDS_SUCCESS, FETCH_CARDS_FAILURE } from '../actions/paymentActions';

const initialState = {
    cardList: [],
    error: null,
};

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CARDS_SUCCESS:
            return {
                ...state,
                cardList: action.payload,
                error: null,
            };
        case FETCH_CARDS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};