import {
    GET_ALL_CATEGORIES_BEGIN,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL
} from "../actions/categoryAction";

const initialState = {
    categories: null,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_BEGIN:
            return { ...state, loading: true, error: null };

        case GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload.data.categories
            };

        case GET_ALL_CATEGORIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error?.response?.data || action.payload.error?.message
            };

        default:
            return state;
    }
};
