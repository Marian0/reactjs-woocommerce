import React, {Component} from 'react';
import {Row, Col} from 'antd';
import ShoppingCart from './ShoppingCart';

class Checkout extends Component {

    render() {

        return (
            <Row>
                <Col span={14}>

                    <h2>Checkout</h2>

                </Col>

                <Col span={10}>

                    <ShoppingCart/>

                </Col>
            </Row>
        );
    }
}

export default Checkout;
