import React from 'react';

import { Container, Spinner } from './styles';
import LoadingIcon from '../../assets/images/loading.svg';

export default function Loading() {
  return (
    <Container>
      <Spinner src={LoadingIcon} alt="Loading" />
    </Container>
  );
}
