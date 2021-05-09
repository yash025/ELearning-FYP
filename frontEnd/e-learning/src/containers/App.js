import React, { Component } from 'react';
import { UIRouter, UIView } from '@uirouter/react';
import { router } from '../services/router';

import './App.css';
// import Register from '../components/Register';
// import Login1 from '../components/Login1';

// App.jsx

class App extends Component {
    render() {
        return (
            <UIRouter router={router}>
              <UIView/>
            </UIRouter>
        );
    }
}

export default App;
