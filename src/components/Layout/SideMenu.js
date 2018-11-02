import React, {Component} from 'react';
import {Layout, Menu, Spin} from 'antd';
import axios from 'axios';
import config from "../../config";

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

        setTimeout(() => {

        axios.get(`${config.endpoint}products/categories?per_page=30&consumer_key=${config.key}&consumer_secret=${config.secret}`)
            .then(response => {

                this.setState({
                    categories: response.data,
                    loading: false
                });

                console.log(response.data);
            });
        }, 2000);

    }

    render() {

        return (
            <Sider width={400} style={{background: '#fff'}}>

                <h2>Categories</h2>

                {
                    this.state.loading &&

                    <div style={SideStyle}>
                        <Spin size="large" tip="Loading Categories..."/>
                    </div>

                }


                {
                    !this.state.loading &&
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%'}}
                    >
                        {
                            this.state.categories.map((category) => {
                                return (
                                        <Menu.Item key={category.id}>
                                            {
                                                category.image &&
                                                <img src={category.image.src} alt={category.name} style={categoryImage}/>
                                            }
                                            {category.name}
                                        </Menu.Item>
                                    );
                            })
                        }

                    </Menu>
                }

            </Sider>

        );
    }
};

export default SideMenu;
