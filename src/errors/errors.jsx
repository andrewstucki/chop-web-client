// @flow
import React from 'react';
import styles from './styles.css';
import type { ErrorType } from './dux';

type ErrorsProps = {
  errors: Array<ErrorType>,
};

const Errors = ({ errors = [] }: ErrorsProps) => (
  <div className={styles.errors}>
    {
      errors.map(error => 
        <p key={error.id}>{error.message}</p>
      )
    }
  </div>
);

export default Errors;
