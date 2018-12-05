import React, { Component, Fragment } from 'react';
import { Spin, List, Card, Button, Pagination, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { addToCart } from "../actions";
import { getProductsByCategory, getCategoryById } from "../remotes/woocommerce";
import no_image from '../img/no_image.jpg'

const { Meta } = Card;

class ProductList extends Component {

    constructor(props, state) {
        super(props, state);

        this.state = {
            category_id: null,
            products: [],
            loading: false,
            currentPage: 1,
            category: []
        }
    }

    fetchCategory = category_id => {
        this.setState({
            loading: true,
        });

        getCategoryById(category_id).then(response => {
            this.setState({
                category: response.data,
                loading: false,
            });
        });
    }

    fetchProducts = (category_id, page, per_page) => {
        this.setState({
            loading: true,
            products: [],
            category_id
        });

        getProductsByCategory(category_id, page, per_page).then(response => {
            this.setState({
                products: response.data,
                loading: false,
                currentPage: page
            });
        });
    };

    componentDidUpdate() {
        if (this.state.category_id !== this.props.match.params.id) {
            this.fetchCategory(this.props.match.params.id);
            this.fetchProducts(this.props.match.params.id, 1, process.env.REACT_APP_WOOCOMMERCE_PRODUCTS_PER_PAGE);
        }
    }

    renderPrices = (item) => {
        if (parseFloat(item.price) === parseFloat(item.regular_price)) {
            return <span>$ {item.price}</span>;
        } else {
            var discount = (1 - (parseInt(item.price)/parseInt(item.regular_price)))*100;
            return (<span><span style={{color: "red", fontWeight: "bold"}}>{`${discount.toFixed(0)}%`}</span> | <strike>$ {item.regular_price}</strike> | <b>$ {item.price}</b></span>);
        }
    };

    onChange = (page) => {
        this.fetchProducts(this.state.category_id, page, process.env.REACT_APP_WOOCOMMERCE_PRODUCTS_PER_PAGE);
    }

    renderProducts = () => {
        if (this.state.loading) {
            return (
                <Spin size="large" tip="Loading Products..." />
            );
        }

        if (!this.state.products || this.state.products.length === 0) {
            return <p>No products in this category</p>
        }

        return (
            <Fragment>
                <Row style={{marginBottom: 20}}>
                    <Col>
                        <Pagination defaultPageSize={parseInt(process.env.REACT_APP_WOOCOMMERCE_PRODUCTS_PER_PAGE)} showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} defaultCurrent={this.state.currentPage} total={this.state.category.count} onChange={this.onChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={this.state.products}
                            renderItem={item => (
                                <List.Item>
                                    {
                                        item.price > 0 && 
                                        <Card
                                            
                                            cover={<img alt="product" src={item.images[0] ? item.images[0].src : no_image} />}
                                            actions={[
                                                <Button type="primary" icon="plus" onClick={() => this.props.addToCart(item)}>Add to Cart</Button>
                                            ]}>                                    
                                            <Meta
                                                title={item.name}
                                                description={this.renderPrices(item)}
                                            />
                                        </Card> 
                                    }
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>  
            </Fragment>
        );

    };

    render() {

        return (
            <div>
                <h1>Products on {this.state.category.name}</h1>
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
