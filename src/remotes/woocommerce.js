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
        per_page: 100
    };

    return axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}/wp-json/wc/v3/products/categories`, defaultHeaders);
};

/**
 * Retrieves products with category_id given as parameter
 * @param category_id
 * @returns {AxiosPromise<any>}
 */
const getProductsByCategory = (category_id) => {

    defaultHeaders.params = {
        category: category_id,
        per_page: 100
    };

    return axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}wp-json/wc/v3/products`, defaultHeaders)
};

/**
 * Get payment method info for checkout
 * @returns {AxiosPromise<any>}
 */
const getPaymentInfo = () => {
    return axios.get('https://www.repartienda.com/wp-json/wc/v3/payment_gateways', defaultHeaders);
};


export {getPaymentInfo, getProductsByCategory, getCategories};
