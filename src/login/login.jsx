// @flow
/* global SyntheticKeyboardEvent, SyntheticMouseEvent */
import React, { useState, useRef } from 'react';
import { Wrapper, ButtonWrapper } from './styles';
import InputField from '../components/inputField';
import Button, {BUTTON_MEDIUM, BUTTON_PRIMARY} from '../components/button';
import Errors from '../errors';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type LoginProps = {
  basicAuthLogin: (email: string, password: string) => void,
  isAuthenticated: boolean,
  clearErrors: () => void,
};

type LoginState = {
  email: string,
  password: string,
};

const Login = ({ basicAuthLogin, isAuthenticated, clearErrors }: LoginProps) => {
  const { t } = useTranslation('forms');
  const [values, setValues] = useState < LoginState > ({ email: '', password: '' });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues({ ...values, [name]: value });
  };

  const handleLogin = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { current:currentEmail } = emailRef;
    const { current:currentPassword } = passwordRef;

    // Fallback to React Uncontrolled DOM components for AutoFill
    const {
      email = currentEmail === null ? '' : currentEmail.value(),
      password = currentPassword === null ? '' : currentPassword.value(),
    } = values;

    clearErrors();
    basicAuthLogin(email, password);
  };


  if (isAuthenticated) {
    return (
      <Redirect to='/'/>
    );
  } else {
    return (
      <Wrapper data-testid="login">
        <h1>{t('login.title')}</h1>
        <Errors />
        <form onSubmit={handleLogin}>
          <InputField
            ref={emailRef}
            type='email'
            name='email'
            label={t('login.email')}
            onChange={onChange}
            value={values.email}
            autoComplete='email'
          />
          <InputField
            ref={passwordRef}
            type='password'
            name='password'
            label={t('login.password')}
            onChange={onChange}
            value={values.password}
            autoComplete='current-password'
          />
          <ButtonWrapper>
            <Button
              onClick={handleLogin}
              variant={BUTTON_PRIMARY}
              size={BUTTON_MEDIUM}
            >
              { t('login.submit') }
            </Button>
          </ButtonWrapper>
        </form>
      </Wrapper>
    );
  }
};

export default React.memo < LoginProps > (Login);
