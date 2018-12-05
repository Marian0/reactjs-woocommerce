import axios from "axios/index";

/**
 * Default headers for doing API request to Woocommerce using API v3 and basic auth
 * @type {{params: {}, withCredentials: boolean, auth: {username: *, password: *}}}
 */
let defaultHeaders = {
    params: {},
    withCredentials: true,
    auth: {
        username: process.env.REACT_APP_WOOCOMMERCE_API_CLIENT,
        password: process.env.REACT_APP_WOOCOMMERCE_API_SECRET
    }
};

/**
 * Retrieves category tree
 * @returns {AxiosPromise<any>}
 */
const getCategories = () => {
    defaultHeaders.params = {
        per_page: process.env.REACT_APP_WOOCOMMERCE_CATEGORIES_PER_PAGE
    };

    return axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}/wp-json/wc/v3/products/categories`, defaultHeaders);
};

/**
 * Retrieves products with category_id given as parameter
 * @param category_id
 * @returns {AxiosPromise<any>}
 */
const getProductsByCategory = (category, page, per_page) => {

    defaultHeaders.params = {
        orderby: 'title',
        order: 'asc', 
        status: 'publish',
        category,
        per_page,
        page,
    };

    return axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}/wp-json/wc/v3/products`, defaultHeaders)
};

const getCategoryById = (category_id) => {

    return axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}/wp-json/wc/v3/products/categories/${category_id}`, defaultHeaders)
};

/**
 * Get payment method info for checkout
 * @returns {AxiosPromise<any>}
 */
const getPaymentInfo = () => {
    return axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}/wp-json/wc/v3/payment_gateways`, defaultHeaders);
};


export {getPaymentInfo, getProductsByCategory, getCategories, getCategoryById};
