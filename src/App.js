import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputField from './components/InputField';
import CountryDropDownField from './components/CountryDropDownField';

class App extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    localStorage.clear();
  }

  render() {
    return (
      <div>
        <header>
          <div className="Logo-div">
            <img src={logo} alt="Bynk logo" className="Logo-img" />
          </div>
          <h2>About You</h2>
        </header>
        <form className="Survey">
          <InputField field="ssn" />
          <InputField field="phone" />
          <InputField field="email" />
          <CountryDropDownField />
          <div className="Submit-button-div">
            <input type="submit" value="Submit" className="Submit-button" onClick={this.handleSubmit} />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
