import React from 'react';
import {Row, Col} from 'antd';
import ShoppingCart from './ShoppingCart';
import ProductList from './ProductList';

const Shopping = (props) => {
    return (
        <Row>
            <Col span={14}>

                <ProductList {...props} />

            </Col>

            <Col span={10}>

                <ShoppingCart/>

            </Col>
        </Row>
    );
};

export default Shopping;
