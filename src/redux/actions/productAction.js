

import productsMock from "../../mocks/products.mock";
// import API from "../../axios/API"; // descomente quando voltar a usar API

/* ====== ACTION TYPES (NÃO COMENTE) ====== */
export const APPLY_FILTERS_BEGIN = "APPLY_FILTERS_BEGIN";
export const APPLY_FILTERS_SUCCESS = "APPLY_FILTERS_SUCCESS";
export const APPLY_FILTERS_FAIL = "APPLY_FILTERS_FAIL";

export const SEARCH_BEGIN = "SEARCH_BEGIN";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAIL = "SEARCH_FAIL";

export const GET_ALL_PRODUCTS_BEGIN = "GET_ALL_PRODUCTS_BEGIN";
export const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";
export const GET_ALL_PRODUCTS_FAIL = "GET_ALL_PRODUCTS_FAIL";

export const GET_PRODUCT_BEGIN = "GET_PRODUCT_BEGIN";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAIL = "GET_PRODUCT_FAIL";

export const GET_PRODUCTS_BY_CATEGORY_BEGIN = "GET_PRODUCTS_BY_CATEGORY_BEGIN";
export const GET_PRODUCTS_BY_CATEGORY_SUCCESS = "GET_PRODUCTS_BY_CATEGORY_SUCCESS";
export const GET_PRODUCTS_BY_CATEGORY_FAIL = "GET_PRODUCTS_BY_CATEGORY_FAIL";

/* ====== ACTIONS (MOCK) ====== */

export const getAllProducts = () => (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_BEGIN });

    try {
        const res = { data: { products: productsMock } };

        dispatch({
            type: GET_ALL_PRODUCTS_SUCCESS,
            payload: res,
        });

        return res;
    } catch (error) {
        dispatch({
            type: GET_ALL_PRODUCTS_FAIL,
            payload: { error },
        });

        return error;
    }
};
export const applyFilters = (filter_string) => (dispatch) => {
    dispatch({ type: APPLY_FILTERS_BEGIN });

    try {
        const filtered = productsMock; // por enquanto não aplica filtro
        const res = { data: { products: filtered } };

        dispatch({
            type: APPLY_FILTERS_SUCCESS,
            payload: res,
        });

        return res;
    } catch (error) {
        dispatch({
            type: APPLY_FILTERS_FAIL,
            payload: { error },
        });
        return error;
    }
};

export const search = (text) => (dispatch) => {
    dispatch({ type: SEARCH_BEGIN });

    try {
        const q = String(text || "").trim().toLowerCase();

        const filtered = !q
            ? productsMock
            : productsMock.filter((p) => {
                const title = String(p.title || "").toLowerCase();
                const desc = String(p.description || "").toLowerCase();
                return title.includes(q) || desc.includes(q);
            });

        const res = { data: { products: filtered } };

        dispatch({
            type: SEARCH_SUCCESS,
            payload: res,
        });

        return res;
    } catch (error) {
        dispatch({
            type: SEARCH_FAIL,
            payload: { error },
        });
        return error;
    }
};

export const getProductsByCategory = (c) => (dispatch) => {
    dispatch({ type: GET_PRODUCTS_BY_CATEGORY_BEGIN });

    try {
        const cat = String(c || "").trim().toLowerCase();

        // O template usava "category" na query.
        // No seu mock, eu recomendo usar "department" ou "category".
        const filtered = !cat
            ? productsMock
            : productsMock.filter((p) => {
                const dept = String(p.department || "").toLowerCase();
                const category = String(p.category || "").toLowerCase();
                return dept.includes(cat) || category.includes(cat);
            });

        const res = { data: { products: filtered } };

        dispatch({
            type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
            payload: res,
        });

        return res;
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_BY_CATEGORY_FAIL,
            payload: { error },
        });
        return error;
    }
};


export const getProduct = (id) => (dispatch) => {
    dispatch({ type: GET_PRODUCT_BEGIN });

    try {
        const item = productsMock.find((p) => String(p._id) === String(id));
        const res = { data: { product: item || null } };

        dispatch({ type: GET_PRODUCT_SUCCESS, payload: res });
        return res;
    } catch (error) {
        dispatch({ type: GET_PRODUCT_FAIL, payload: { error } });
        return error;
    }
};

/* ====== QUANDO QUISER VOLTAR PRA API ======
export const getAllProducts = () => dispatch => { ...API... }
export const getProduct = id => dispatch => { ...API... }
export const getProductsByCategory = c => dispatch => { ...API... }
export const search = text => dispatch => { ...API... }
export const applyFilters = filter_string => dispatch => { ...API... }
*/
