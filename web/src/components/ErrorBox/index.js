import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Creators as ErrorActions } from '../../store/ducks/errors';

import CloseIcon from '../../assets/images/close.svg';
import { Container } from './styles';

function ErrorBox({ errors, hideError }) {
  return (
    errors.visible &&
    <Container>
      <p>{errors.message}</p>
      <button onClick={hideError}>
        <img src={CloseIcon} alt="Close" />
      </button>
    </Container>
  );
}

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = ErrorActions;

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBox);
