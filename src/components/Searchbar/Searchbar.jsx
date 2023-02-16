import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, SearchForm, Button, Input } from './Searchbar.Styled';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  submitForm = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.search);
  };

  handleChange = ({target}) => {
    const inputValue = target.value.trim().toLowerCase();
    this.setState({ search: inputValue });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.submitForm}>
          <Button type="submit">
            <span>Search</span>
          </Button>

          <Input
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
