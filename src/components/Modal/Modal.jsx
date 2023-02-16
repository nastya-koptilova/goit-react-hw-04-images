import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Container, Image } from './Modal.Styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClose);
  }

  onEscClose = event => {
    if (event.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  onOverlayClose = event => {
    if (event.target === event.currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    const url = this.props.large;
    const alt = this.props.alt;
    return (
      <Overlay onClick={this.onOverlayClose}>
        <Container>
          <Image src={url} alt={alt} />
        </Container>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
