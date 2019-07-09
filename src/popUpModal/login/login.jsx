// @flow
import React, { useState } from 'react';
import Modal from '../modal';
import { useTranslation } from 'react-i18next';
import { Button, ActionContainer, REGRESS } from '../styles';
import { SubmitButton, InputField, InputWrapper, InputLabel, InputFieldButton, ErrorMessage, InputFieldWrapper, MessageWrapper } from './styles';
import { validEmail } from '../../util';

type LoginPropsType = {|
  togglePopUpModal: () => void,
  basicAuthLogin: (email: string, password: string) => void,
  removeLoginError: () => void,
  resetPassword: () => void,
  isSmall: boolean,
  error: boolean,
|};

type LoginState = {
  email: string,
  password: string,
  emailBlank: boolean,
  passwordBlank: boolean,
  emailInvalid: boolean,
};

const LoginPopUpModal = (
  {
    togglePopUpModal,
    basicAuthLogin,
    removeLoginError,
    resetPassword,
    isSmall,
    error,
  }: LoginPropsType
) => {
  const { t } = useTranslation('forms');
  const [values, setValues] = useState < LoginState > ({ email: '', password: '', emailBlank: false, passwordBlank: false, emailInvalid: false });

  const onChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (error) {
      removeLoginError();
    }
    const { name, value } = event.currentTarget;
    if (name === 'email') {
      setValues({ ...values, [name]: value, ['emailBlank']: false, ['emailInvalid']: false });
    } else {
      setValues({ ...values, [name]: value, ['passwordBlank']: false });
    }
  };

  const handleLogin = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (values.email !== '' && values.password !== '' && validEmail(values.email)) {
      basicAuthLogin(values.email, values.password);
    } else {
      setValues(
        {
          ...values,
          emailBlank: values.email === '',
          emailInvalid: !validEmail(values.email) && values.email !== '',
          passwordBlank: values.password === '',
        }
      );
    }
  };

  return (
    <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} header={t('login.title')} showDismissButton={true} id="login-modal">
      <MessageWrapper>
        <ErrorMessage visible={error}>{ t('login.error') }</ErrorMessage>
      </MessageWrapper>
      <form onSubmit={handleLogin}>
        <InputWrapper>
          <InputFieldWrapper>
            <InputField type="text" name="email" id="email" data-testid="login-emailField" value={values.email} onChange={onChange} error={values.emailBlank || values.emailInvalid || error}/>
            <InputLabel htmlFor="email">{ t('login.email') }</InputLabel>
          </InputFieldWrapper>
          <ErrorMessage visible={values.emailBlank}>{ t('login.blank_email') }</ErrorMessage>
          <ErrorMessage visible={values.emailInvalid}>{ t('login.invalid_email') }</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <InputFieldWrapper>
            <InputField type="password" name="password" id="password" data-testid="login-passwordField" value={values.password} onChange={onChange} buttonPresent={true} error={values.passwordBlank || error}/>
            <InputLabel htmlFor="password">{ t('login.password') }</InputLabel>
            {/* TODO: Remove this `false` when two way sync is figured out */}
            { false &&
            <InputFieldButton buttonType={REGRESS} onClick={resetPassword} data-testid='login-forgotPassword' type="button">
              { t('login.forgot') }
            </InputFieldButton> }
          </InputFieldWrapper>
          <ErrorMessage visible={values.passwordBlank}>{ t('login.blank_password') }</ErrorMessage>
        </InputWrapper>
        <ActionContainer>
          <Button buttonType={REGRESS} type="button" onClick={() => {}} data-testid='login-signUp' >
            { t('login.sign_up') }
          </Button>
          <SubmitButton data-testid='login-loginButton' small={isSmall} type="submit" onClick={handleLogin}>
            { t('login.submit') }
          </SubmitButton>
        </ActionContainer>
      </form>
    </Modal>
  );
};

export default LoginPopUpModal;
