import React, {Component} from 'react';
import axios from "axios/index";
import {Spin, List, Card, Icon } from 'antd';

const { Meta } = Card;

class ProductList extends Component {

    constructor(props, state) {
        super(props, state);

        this.state = {
            category_id: null,
            products: [],
            loading: false
        }

    }

    fetchProducts = (category_id) => {

        this.setState({
            loading: true,
            products: [],
            category_id
        });

        axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}products?category=${category_id}&per_page=30&consumer_key=${process.env.REACT_APP_WOOCOMMERCE_API_CLIENT}&consumer_secret=${process.env.REACT_APP_WOOCOMMERCE_API_SECRET}`)
            .then(response => {

                this.setState({
                    products: response.data,
                    loading: false
                });

            });
    };

    componentDidUpdate() {

        if (this.state.category_id !== this.props.match.params.id) {
            this.fetchProducts(this.props.match.params.id);
        }

    }

    renderProducts = () => {

        if (this.state.loading) {
            return (
                <Spin size="large" tip="Loading Products..."/>
            );
        }

        if (!this.state.products || this.state.products.length === 0) {
            return <p>No products in this category</p>
        }

        return (
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={this.state.products}
                renderItem={item => (
                    <List.Item>
                        <Card
                            style={{ width: 300 }}
                            cover={<img alt="example" src={item.images[0].src} />}
                            actions={[<Icon type="plus" />, <Icon type="minus" />, <Icon type="ellipsis" />]}
                        >
                            <Meta
                                title={item.name}
                                description={item.price}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        );

    };

    render() {

        return (
            <div>
                <h1>Products on category {this.props.match.params.id}</h1>
                {this.renderProducts()}
            </div>
        );
    }
}


export default ProductList;
