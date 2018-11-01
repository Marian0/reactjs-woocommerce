import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Layout from './component/Layout/Layout';

class App extends Component {
    render() {
        return (
            <Router>
                <Layout />
            </Router>
        );
    }
}

export default App;
