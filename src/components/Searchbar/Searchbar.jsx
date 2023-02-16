import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, SearchForm, Button, Input } from './Searchbar.Styled';

export const Searchbar = ({onFormSubmit}) => {
  const [search, setSearch] = useState('')

  const submitForm = event => {
    event.preventDefault();
    onFormSubmit(search);
  };

  const handleChange = ({target}) => {
    const inputValue = target.value.trim().toLowerCase();
    setSearch(inputValue);
  };

    return (
      <Header>
        <SearchForm onSubmit={submitForm}>
          <Button type="submit">
            <span>Search</span>
          </Button>

          <Input
            onChange={handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
