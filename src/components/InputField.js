import React, { Component } from 'react';

const ssnFormat = /^\(?([0-9]{6})\)?[-. ]?([0-9]{4})$/;
const phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
const emailFormat = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";

class InputField extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
            validEntry: true
        };

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);        
    }

    getLocalStorage(field) {
        var value = localStorage.getItem(field);
        if (value !== null) {
            this.handleValidation(field, value);
            this.setState({
                value
            });
        } else {
            this.props.onConfirmValidation(field, false);
        }
    }

    setLocalStorage(input) {
        localStorage.setItem(input.id, input.value);
    }

    handleValidation(id, value) {
        let format = '';
        switch (id) {
            case 'ssn': 
                format = ssnFormat;
                break;
            case 'phone':
                format = phoneFormat;
                break;
            case 'email':
                format = emailFormat;
                break;
            default: 
                return;
        }
        const validEntry = value.match(format) !== null;
        this.props.onConfirmValidation(id, validEntry);
        this.setState({
            validEntry
        });
    }

    componentDidMount() {
        const { field } = this.props;
        if (field !== null) {
            this.getLocalStorage(field);            
        }   
    }

    onChange(e) {
        this.setLocalStorage(e.target);
        this.setState({
            value: e.target.value
        });
    }

    onBlur(e) {
        this.handleValidation(e.target.id, e.target.value);       
    }

    render() {
        const { field } = this.props;
        const { value, validEntry } = this.state;
        let label, type, placeholder;

        switch (field) {
            case 'ssn': 
                label = 'Social Security Number';
                type = 'text';
                placeholder = 'Must be a valid Swedish Social Security Number - XXXXXX-XXXX.'
                break;
            case 'phone':
                label = 'Phone';
                type = 'text';
                placeholder = 'Must be a valid Swedish phone number - XXX-XXX-XXX.'
                break;
            case 'email':
                label = 'Email';
                type = 'email';
                placeholder = "Must be a valid email."
                break;
            default: 
                return;
        }
        
        return (
            <div>
                <div className={`${field}-input-div input`}>
                    <div>
                        <label htmlFor={field}>{label}*</label>
                    </div>
                    <input
                        required
                        className="input-field"
                        id={field}
                        type={type}
                        step="any"
                        placeholder={placeholder}
                        value={value}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                    />
                </div>
                {validEntry ? 
                    <div className="Error-message" />
                    : <div className="Error-message">
                        <p>{placeholder}</p>
                      </div>
                }
            </div>
        );
    }
};

export default InputField;
