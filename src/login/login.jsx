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
  emailInput: { current: InputField }
  passwordInput: { current: InputField } 

  constructor (props:LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: [],
    };

    // $FlowFixMe
    this.emailInput = React.createRef();
    // $FlowFixMe
    this.passwordInput = React.createRef();
    
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
    let { email, password } = this.state;

    // Fallback to React Uncontrolled DOM components for AutoFill
    if ( email === '' ) {
      email = this.emailInput.current.value(); 
    } 
    if ( password === '') {
      password = this.passwordInput.current.value(); 
    }

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
              onChange={event => this.handleUserInput(event)}
              // $FlowFixMe
              ref={this.emailInput}/>
            <InputField
              type='password'
              name='password'
              label='Password'
              onChange={event => this.handleUserInput(event)}
              // $FlowFixMe
              ref={this.passwordInput} />
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
