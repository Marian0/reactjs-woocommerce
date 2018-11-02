import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Layout} from 'antd';

import AppHeader from './components/Layout/AppHeader';
import SideMenu from './components/Layout/SideMenu';
import AboutUs from './components/AboutUs';


const {Content, Footer} = Layout;

const Index = () => <h2>Home</h2>;
const Contact = () => <h2>Contact Us</h2>;

class App extends Component {
    render() {
        return (
            <Layout style={{height: "100vh"}}>

                <Router>
                    <div>
                        <AppHeader/>

                        <Content style={{padding: '0 50px'}}>

                            <Layout style={{padding: '24px 0', background: '#fff'}}>
                                <SideMenu/>
                                <Content style={{padding: '0 24px', minHeight: 280}}>
                                    <Route path="/" exact component={Index}/>
                                    <Route path="/about/" component={AboutUs}/>
                                    <Route path="/contact/" component={Contact}/>
                                </Content>
                            </Layout>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            React-Woocommerce | ReactJS interfase using Ant Design for Woocommerce API
                        </Footer>
                    </div>
                </Router>
            </Layout>

        );
    }
}

export default App;
