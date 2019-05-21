// @flow
import React from 'react';
import { Wrapper } from './styles';
import type { ErrorType } from './dux';

type ErrorsProps = {
  errors: Array<ErrorType>,
};

const Errors = ({ errors = [] }: ErrorsProps) => (
  <Wrapper data-testid='errors'>
    {
      errors.map(error =>
        <p data-testid="error-message" key={error.id}>{error.message}</p>
      )
    }
  </Wrapper>
);

export default Errors;
