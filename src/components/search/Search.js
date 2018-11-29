import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '2114282-5d7127f947ae281078e92cbb5',
        lang: 'tr',
        images: [],


    }
    onTextChange = e => {
        const val = e.target.value;
        this.setState({ [e.target.name]: val }, () => {
            if (val === '') {
               this.setState({images: []});         
            }else{
                axios
                .get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res => this.setState({ images: res.data.hits }))
                .catch(err => console.log(err));
           
            }
        });
    };

    onAmountChange = ( e, index, value ) => this.setState({amount: value});

    render() {
        console.log(this.state.images);

        return (
            <div>
                <TextField
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Burdan ara Aq!"
                    fullWidth={true}
                />
                <br />

                <SelectField
                    name="amount"
                    floatingLabelText="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                >
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={20} primaryText="20" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={40} primaryText="40" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br />
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
            </div>
        )
    }
}

export default Search;