import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="Logo-div">
            <img src={logo} alt="Bynk logo" className="Logo-img" />
          </div>
          <h2>About You</h2>
        </header>
        <Form />
      </div>
    );
  }
}

export default App;
