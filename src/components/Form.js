import React, { Component } from 'react';
import InputField from './InputField';
import CountryDropDownField from './CountryDropDownField';

class Form extends Component {
    constructor() {
        super();

        this.state = {
            validEntries: {
                ssn: null,
                phone: null,
                email: null,
                country: null
            },
            saveFailed: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmValidation = this.confirmValidation.bind(this);
    }

    confirmValidation(field, validEntry) {
        this.setState(prevState => ({
            validEntries: {
                ...prevState.validEntries,
                [field]: validEntry
            }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(Object.values(this.state.validEntries))
        if (!Object.values(this.state.validEntries).includes(false)) {
            var inputs = document.getElementsByClassName("input-field");
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = ""
            }
            localStorage.clear();
            console.log("Saved!")
        } else {
            console.log("Save failed");
            this.setState({
                saveFailed: true
            });          
        }
    }

    render() {
        return (
            <form className="Survey">
                <InputField field="ssn" onConfirmValidation={this.confirmValidation} />
                <InputField field="phone" onConfirmValidation={this.confirmValidation} />
                <InputField field="email" onConfirmValidation={this.confirmValidation} />
                <CountryDropDownField onConfirmValidation={this.confirmValidation} />
                <div className="Submit-button-div">
                    <input type="submit" value="Submit" className="Submit-button" onClick={this.handleSubmit} />
                </div>
                {
                    this.state.saveFailed ? <div className="Error-submit-message">Please fill out form before submitting.</div> : ''
                }
            </form>
        );
    }
}

export default Form;
