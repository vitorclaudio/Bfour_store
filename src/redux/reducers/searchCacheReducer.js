import {
    SEARCH_CACHE_BEGIN,
    SEARCH_CACHE_SUCCESS,
    SEARCH_CACHE_FAIL
} from "../actions/searchCacheAction";

const initialState = {
    items: [],
    loading: false,
    error: null,
    lastFetch: 0
};

export default function searchCacheReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_CACHE_BEGIN:
            return { ...state, loading: true, error: null };

        case SEARCH_CACHE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.items || [],
                lastFetch: action.payload.lastFetch || 0,
                error: null
            };

        case SEARCH_CACHE_FAIL:
            return { ...state, loading: false, error: action.payload || "Error" };

        default:
            return state;
    }
}
