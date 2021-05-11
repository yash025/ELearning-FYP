import React, { Component } from 'react';
import { UIRouter, UIView } from '@uirouter/react';
import { router } from '../services/router';

import './App.css';


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
