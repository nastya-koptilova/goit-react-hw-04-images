import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadMore, Container } from './Button.Styled';

export class Button extends Component {
  onButtonClick = () => {
    this.props.onButtonClick();
  };

  render() {
    return (
      <Container>
        <LoadMore type="button" onClick={this.onButtonClick}>
          Load more
        </LoadMore>
      </Container>
    );
  }
}

Button.propTypes = {
    onButtonClick: PropTypes.func.isRequired,
  };


