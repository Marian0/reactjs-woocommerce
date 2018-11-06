import React, {Component} from 'react';
import {Layout, Menu, Spin} from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom';

const {Sider} = Layout;


const SideStyle = {
    textAlign: 'center'
};

const categoryImage = {
    width: '30px',
    height: '30px',
    marginRight: '10px'
};


class SideMenu extends Component {

    constructor(props, state) {
        super(props, state);

        this.state = {

            loading: true,
            categories: []

        };

    }

    componentDidMount() {

        axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_ENDPOINT}products/categories?per_page=30&consumer_key=${process.env.REACT_APP_WOOCOMMERCE_API_CLIENT}&consumer_secret=${process.env.REACT_APP_WOOCOMMERCE_API_SECRET}`)
            .then(response => {

                this.setState({
                    categories: response.data,
                    loading: false
                });

            });
    }

    renderCategories = () => {

        if (this.state.loading) {
            return (
                <div style={SideStyle}>
                    <Spin size="large" tip="Loading Categories..."/>
                </div>
            );
        }

        if (!this.state.categories || this.state.categories.length === 0) {
            return <p>No categories to show</p>
        }

        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{height: '100%'}}
            >
                {
                    this.state.categories.map((category) => {
                        return (
                            <Menu.Item key={category.id}>
                                <Link to={`/category/${category.id}`}>
                                    {
                                        category.image &&
                                        <img src={category.image.src} alt={category.name} style={categoryImage}/>
                                    }
                                    {category.name}
                                </Link>
                            </Menu.Item>
                        );
                    })
                }

            </Menu>
        );

    };

    render() {

        return (
            <Sider width={220}
                   style={{background: '#fff'}}
            >

                <h2>Categories</h2>

                {this.renderCategories()}

            </Sider>

        );
    }
}

export default SideMenu;
