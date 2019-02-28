// @flow
/* global SyntheticKeyboardEvent, SyntheticMouseEvent */
import React, { useState, useRef } from 'react';
import { Wrapper, ButtonWrapper } from './styles';
import InputField from '../components/inputField';
import Button, {BUTTON_MEDIUM, BUTTON_PRIMARY} from '../components/button';
import Errors from '../errors';
import { Redirect } from 'react-router-dom';

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
      <Wrapper>
        <h1>Log In</h1>
        <Errors />
        <form onSubmit={handleLogin}>
          <InputField
            ref={emailRef}
            type='email'
            name='email'
            label='Email'
            onChange={onChange}
            value={values.email}
          />
          <InputField
            ref={passwordRef}
            type='password'
            name='password'
            label='Password'
            onChange={onChange}
            value={values.password}
          />
          <ButtonWrapper>
            <Button
              onClick={handleLogin}
              variant={BUTTON_PRIMARY}
              size={BUTTON_MEDIUM}
            >
              Log In
            </Button>
          </ButtonWrapper>
        </form>
      </Wrapper>
    );
  }
};

export default Login;
