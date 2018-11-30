import React, {Component} from 'react';
import {Spin, List, Card, Button} from 'antd';
import { connect } from 'react-redux';
import {addToCart} from "../actions";
import {getProductsByCategory} from "../remotes/woocommerce";

const {Meta} = Card;

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

        getProductsByCategory(category_id).then(response => {

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
                grid={{gutter: 16, column: 3}}
                dataSource={this.state.products}
                renderItem={item => (
                    <List.Item>
                        <Card
                            cover={<img alt="example" src={item.images[0].src}/>}
                            actions={[
                                <Button type="primary" icon="plus" onClick={() => this.props.addToCart(item) }>Add to Cart</Button>
                            ]}
                        >
                            <Meta
                                title={item.name}
                                description={`$ ${item.price}`}
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


const mapDispatchToProps = (dispatch) => {

    return {
        addToCart(product) {
            dispatch(addToCart(product));
        }
    }

};

export default connect(null, mapDispatchToProps)(ProductList);
