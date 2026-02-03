import API from "../../axios/API";

export const SEARCH_CACHE_BEGIN = "SEARCH_CACHE_BEGIN";
export const SEARCH_CACHE_SUCCESS = "SEARCH_CACHE_SUCCESS";
export const SEARCH_CACHE_FAIL = "SEARCH_CACHE_FAIL";

const CACHE_TTL_MS = 10 * 60 * 1000;

export const fetchSearchCacheIfNeeded = () => (dispatch, getState) => {
    const state = getState();
    const cacheState = state.searchCache;

    const hasItems = Array.isArray(cacheState.items) && cacheState.items.length > 0;
    const lastFetch = cacheState.lastFetch || 0;
    const isFresh = Date.now() - lastFetch < CACHE_TTL_MS;

    if (cacheState.loading) return Promise.resolve(null);
    if (hasItems && isFresh) return Promise.resolve(null);

    dispatch({ type: SEARCH_CACHE_BEGIN });

    return API({ method: "GET", url: "/api/products" })
        .then((res) => {
            const items = (res.data && res.data.products) || [];
            dispatch({ type: SEARCH_CACHE_SUCCESS, payload: { items, lastFetch: Date.now() } });
            return items;
        })
        .catch((error) => {
            dispatch({
                type: SEARCH_CACHE_FAIL,
                payload: error?.response?.data || error?.message || "Failed to fetch"
            });
            return error;
        });
};
