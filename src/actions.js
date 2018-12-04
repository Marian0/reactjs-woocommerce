const addToCart = (product) => {
    //Save just the important
    var p = {};

    p.id = product.id;
    p.name = product.name;
    p.price = parseFloat(product.price);
    p.images = product.images;

    return {
        type: 'ADD_TO_CART',
        product: p
    }
};

const removeFromCart = (product) => {
    return {
        type: 'REMOVE_FROM_CART',
        product
    }
};

const removeProductItem = (product) => {
    return {
        //DECREASE PRODUCT CART
        type: 'REMOVE_PRODUCT_ITEM',
        product
    }
};

const substractProduct = (product) => {
    return {
        type: 'SUBSTRACT_FROM_CART',
        product
    }
};

const loadCartProducts = () => {
    return {
        type: 'LOAD_CART_PRODUCTS',
    }
};

export { addToCart, removeFromCart, substractProduct, loadCartProducts, removeProductItem };
