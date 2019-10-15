import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-select';

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#6035d9' : '#8455b2',
        backgroundColor: state.isSelected ? '#f9f9f9' : '#fff',
        ':active': {
          backgroundColor: '#f9f9f9'
        }
    }),
    control: () => ({
        width: 200,
        background: 'transparent',
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        const color = '#6035d9';
        const backgroundColor = 'transparent';

        return { ...provided, opacity, transition, color, backgroundColor };
    }
}

class CountryDropDownField extends Component {
    constructor() {
        super();

        this.state = {
            countryData: [],
        };

        this.onChange = this.onChange.bind(this);
    }

    getLocalStorage() {
        var value = JSON.parse(localStorage.getItem("country"));
        this.setState({
            selected: value !== null
                ? value : {
                    "value": "Sweden",
                    "label": "Sweden"
                }
        });
    }    

    setLocalStorage(input) {
        localStorage.setItem("country", JSON.stringify(input));
    }

    componentDidMount() {
        this.setData();
        this.getLocalStorage()
    }

    onChange(value) {
        this.setLocalStorage(value);
        this.setState({
            selected: value
        });
    }

    setData() {
        Axios.get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                let countries = [];
                Object.values(response.data).map(value =>  countries.push({ "value": value.name, "label": value.name }));
                this.setState({
                    countryData: countries
                });
            }).catch((err) => {
                console.error(err);
            });
    }

    render() {
        const { countryData } = this.state;
        return (
            <div className="Country-input input">
                <div>
                    <label htmlFor="country" className="country-label">Country</label>
                </div>
                {
                    countryData != null ?
                        <Select
                            required
                            classNamePrefix="Select"
                            id="country"
                            name="country"
                            value={this.state.selected}
                            options={countryData}
                            styles={customStyles}
                            placeholder="Country"
                            onChange={this.onChange}
                        /> : ''
                }
            </div>
        );
    }
}

export default CountryDropDownField;