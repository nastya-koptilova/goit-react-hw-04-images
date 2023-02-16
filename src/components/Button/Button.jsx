import React from 'react';
import PropTypes from 'prop-types';
import { LoadMore, Container } from './Button.Styled';

export const Button = ({onButtonClick}) => {
  const handleButton = () => {
    onButtonClick();
  };

    return (
      <Container>
        <LoadMore type="button" onClick={handleButton}>
          Load more
        </LoadMore>
      </Container>
    );
  }

Button.propTypes = {
    onButtonClick: PropTypes.func.isRequired,
  };


