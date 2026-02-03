import API from "../../axios/API";

export const GET_ALL_CATEGORIES_BEGIN = "GET_ALL_CATEGORIES_BEGIN";
export const GET_ALL_CATEGORIES_SUCCESS = "GET_ALL_CATEGORIES_SUCCESS";
export const GET_ALL_CATEGORIES_FAIL = "GET_ALL_CATEGORIES_FAIL";

export const getAllCategories = () => (dispatch) => {
    dispatch({ type: GET_ALL_CATEGORIES_BEGIN });

    return API({ method: "GET", url: "/api/categories" })
        .then((res) => {
            const data = res.data;
            // Suporta: { categories: [...] } OU retorno direto [...]
            const categories = Array.isArray(data) ? data : (data.categories || []);

            dispatch({
                type: GET_ALL_CATEGORIES_SUCCESS,
                payload: { data: { categories } }
            });

            return categories;
        })
        .catch((error) => {
            dispatch({ type: GET_ALL_CATEGORIES_FAIL, payload: { error } });
            return error;
        });
};
