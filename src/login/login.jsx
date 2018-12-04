// @flow
/* global SyntheticKeyboardEvent */
import React, { Component } from 'react';
import styles from './styles.css';
import InputField from '../components/inputField';
import Button from '../components/button';
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
  errors: Array<string>
}

class Login extends Component<LoginProps, LoginState> {
  handleLogin: () => void
  handleUserInput: (event:SyntheticKeyboardEvent<HTMLInputElement>) => void

  constructor (props:LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: [],
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUserInput (event: SyntheticKeyboardEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  }

  handleLogin (event: SyntheticKeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.clearErrors();
    this.props.basicAuthLogin(email, password);
  }

  render () {
    if (this.props.isAuthenticated) {
      return (
        <Redirect to='/'/>
      );
    } else {
      return (
        <div className={styles.login}>
          <h1>Log In</h1>
          <Errors />
          <form onSubmit={this.handleLogin}>
            <InputField 
              type='email'
              name='email'
              label='Email'
              onChange={event => this.handleUserInput(event)}/>
            <InputField
              type='password'
              name='password'
              label='Password'
              onChange={event => this.handleUserInput(event)} />
            <div style={{display: 'flex', placeContent: 'flex-end'}}>
              <Button
                buttonId="login"
                onClick={this.handleLogin}
                text="Log In"
                buttonStyle="primary"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Login;
