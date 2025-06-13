import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
    FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE
} from '../actions/actionTypes';

const initialState = {
    orderList: [],
    previousOrderLoading: false,
    order: null,
    loading: false,
    error: null,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                orderList: [action.payload, ...state.orderList],
            };

        case CREATE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_ORDERS_REQUEST:
            return { ...state, previousOrderLoading: true, error: null };
            
        case FETCH_ORDERS_SUCCESS:
            const sortedOrders = [...action.payload].sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
            return { ...state, previousOrderLoading: false, orderList: sortedOrders };

        case FETCH_ORDERS_FAILURE:
            return { ...state, previousOrderLoading: false, error: action.payload };
            
        default:
            return state;
    }
};