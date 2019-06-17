// @flow
import React, { useState, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { ActionContainer } from '../styles';
import { InputField, InputLabel, ErrorMessage, InputWrapper, InputFieldWrapper, SubmitButton, MessageWrapper } from '../login/styles';
import { Modal } from '../popUpModal';

type resetPasswordPropsType = {
  togglePopUpModal: () => void,
  resetPassword: (resetToke: string, password: string) => string,
  isSmall: boolean,
  resetToken: string,
};

type ResetPasswordState = {
  password: string,
  passwordConfirmation: string,
  passwordBlank: boolean,
  passwordConfirmationBlank: boolean,
  match: boolean,
};

const ResetPasswordPopUpModal = (
  {
    togglePopUpModal,
    resetPassword,
    isSmall,
    resetToken,
  }: resetPasswordPropsType
) => {
  const { t } = useTranslation('forms');

  const [values, setValues] = useState < ResetPasswordState > ({ password: '', passwordConfirmation: '', passwordBlank: false, passwordConfirmationBlank: false, match: true });
  const passwordRef = useRef(null);

  const onChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const passwordBlank = `${name}Blank`;
    setValues({ ...values, [name]: value, [passwordBlank]: false, match: true });
  };

  const handleReset = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (values.password !== '' && values.password === values.passwordConfirmation) {
      const { current:currentPassword } = passwordRef;

      const {
        password = currentPassword === null ? '' : currentPassword.value(),
      } = values;
      resetPassword(resetToken, password);
    } else {
      setValues(
        {
          ...values, 
          passwordBlank: values.password === '',
          passwordConfirmationBlank: values.passwordConfirmation === '',
          match: values.password === '' || values.passwordConfirmation === '' || values.password === values.passwordConfirmation,
        }
      );
    }
  };

  return (
    <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} header={t('reset_password.title')} id="resetPassword-modal">
      <MessageWrapper>
        <ErrorMessage visible={!values.match}>{ t('reset_password.passwords_dont_match') }</ErrorMessage>
      </MessageWrapper>
      <form onSubmit={handleReset}>
        <InputWrapper>
          <InputFieldWrapper>
            <InputField type="password" name="password" id="password" data-testid="resetPassword-passwordField" value={values.password} ref={passwordRef} onChange={onChange} error={values.passwordBlank || !values.match}/>
            <InputLabel htmlFor="password">{ t('reset_password.password') }</InputLabel>
          </InputFieldWrapper>
          <ErrorMessage visible={values.passwordBlank}>{ t('reset_password.blank_password') }</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <InputFieldWrapper>
            <InputField type="password" name="passwordConfirmation" id="passwordConfirmation" data-testid="resetPassword-passwordConfirmationField" value={values.passwordConfirmation} onChange={onChange} error={values.passwordConfirmationBlank || !values.match}/>
            <InputLabel htmlFor="passwordConfirmation">{ t('reset_password.confirm_password') }</InputLabel>
          </InputFieldWrapper>
          <ErrorMessage visible={values.passwordConfirmationBlank}>{ t('reset_password.blank_password') }</ErrorMessage>
        </InputWrapper>
        <ActionContainer>
          <SubmitButton small={isSmall} type="submit" onClick={handleReset} data-testid='resetPassword-reset' >
            { t('reset_password.save') }
          </SubmitButton>
        </ActionContainer>
      </form>
    </Modal>
  );
};

export default ResetPasswordPopUpModal;