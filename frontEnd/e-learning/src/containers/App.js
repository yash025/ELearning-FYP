import React, { Component } from 'react';
import './App.css';
import Register from '../components/Register';
// import Login1 from '../components/Login1';

class App extends Component {
  render() {
    return (    
    <div className="App">
      
      {/* <Login1 /> */}
      <Register/>
    </div>
    );
  }
}

export default App;
