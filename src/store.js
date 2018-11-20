import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

/**
 * Cart function
 * @param state
 * @param action
 * @returns {*}
 */
const cart = (state = [], action) => {

    if (action.type === 'LOAD_CART_PRODUCTS') {

        try {
            return JSON.parse(localStorage.getItem('cart')) || [];
        } catch (e) {
            localStorage.setItem('cart', JSON.stringify([]));
            return [];
        }


    } else if (action.type === 'ADD_TO_CART') {

        const {product} = action;
        let exists = false;

        const changed = state.map((e) => {

            if (e.id === product.id) {
                exists = true;
                e.qty++;
            }

            return e;
        });

        if (!exists) {
            product.qty = 1;
            return state.concat(product);
        }

        return changed;


    } else if (action.type === 'REMOVE_FROM_CART') {
        return state.filter((e) => {
            return e.id !== action.product.id;
        });
    }

    return state;
};

/**
 * Logger middleware
 * @param store
 * @returns {function(*): function(*=): *}
 */
const loger = (store) => (next) => (action) => {
    console.log("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    return result;
};


const updateLocalStorageCart = (store) => (next) => (action) => {
    let result = next(action);

    if (action.type === 'ADD_TO_CART' ||
        action.type === 'REMOVE_FROM_CART') {

        try {
            localStorage.setItem('cart', JSON.stringify(store.getState()['cart']));
        } catch (e) {

            console.log("Error trying to set cart", e);
            localStorage.setItem('cart', JSON.stringify([]));

        }

    }
    return result;
};



export default createStore(combineReducers({
    cart,
}), applyMiddleware(loger, thunk, updateLocalStorageCart));

