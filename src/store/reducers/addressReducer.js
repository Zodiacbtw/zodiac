import { FETCH_ADDRESSES_SUCCESS, FETCH_ADDRESSES_FAILURE } from '../actions/addressActions';

const initialState = {
    addressList: [],
    error: null,
};

export const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADDRESSES_SUCCESS:
            return {
                ...state,
                addressList: action.payload,
                error: null,
            };
        case FETCH_ADDRESSES_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};