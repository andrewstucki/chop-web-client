// @flow
import React, { useState, useRef } from 'react';

import { Trans, useTranslation } from 'react-i18next';
import { Text, ActionContainer, Button, PROGRESS } from '../styles';
import { InputField, InputLabel, ErrorMessage, InputWrapper, InputFieldWrapper, SubmitButton } from '../login/styles';
import { Message } from './styles';
import { Modal } from '../popUpModal';
import { validEmail } from '../../util';

type requestPasswordResetPropsType = {
  togglePopUpModal: () => void,
  requestPasswordReset: (email: string) => void,
  isSmall: boolean,
};

type RequestPasswordResetState = {
  email: string,
  emailBlank: boolean,
  emailInvalid: boolean,
  sent: boolean,
};

const RequestPasswordResetPopUpModal = (
  {
    togglePopUpModal,
    requestPasswordReset,
    isSmall,
  }: requestPasswordResetPropsType
) => {
  const { t } = useTranslation('forms');

  const [values, setValues] = useState < RequestPasswordResetState > ({ email: '', emailBlank: false, emailInvalid: false, sent: false });
  const emailRef = useRef(null);

  const onChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues({ ...values, [name]: value, emailBlank: false, emailInvalid: false });
  };

  const handleSend = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (values.email !== '' && validEmail(values.email)) {
      const { current:currentEmail } = emailRef;

      const {
        email = currentEmail === null ? '' : currentEmail.value(),
      } = values;

      requestPasswordReset(email);
      setValues({ ...values, sent: true});
    } else {
      setValues(
        {
          ...values, 
          emailBlank: values.email === '',
          emailInvalid: !validEmail(values.email) && values.email !== '',
        }
      );
    }
  };

  if (values.sent) {
    return (
      <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} header={t('request_password_reset.title')} id="requestPasswordReset-modal">
        <Message data-testid="requestPasswordReset-confirmation">
          <Trans ns='forms' i18nKey='request_password_reset.confirmation'>
            {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
            If the email exists, we&apos;ve sent the instructions to {{email:values.email}}.
          </Trans>
        </Message>
        <ActionContainer>
          <Button buttonType={PROGRESS} onClick={togglePopUpModal} data-testid='requestPasswordReset-close' >
            { t('request_password_reset.close') }
          </Button>
        </ActionContainer>
      </Modal>
    );
  } else {
    return (
      <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} header={t('request_password_reset.title')} id="requestPasswordReset-modal">
        <Text data-testid="requestPasswordReset-description">{ t('request_password_reset.description') }</Text>
        <form onSubmit={handleSend}>
          <InputWrapper>
            <InputFieldWrapper>
              <InputField type="text" name="email" id="email" data-testid="requestPasswordReset-emailField" value={values.email} ref={emailRef} onChange={onChange} error={values.emailBlank || values.emailInvalid}/>
              <InputLabel htmlFor="email">{ t('request_password_reset.email') }</InputLabel>
            </InputFieldWrapper>
            <ErrorMessage visible={values.emailBlank}>{ t('request_password_reset.blank_email') }</ErrorMessage>
            <ErrorMessage visible={values.emailInvalid}>{ t('request_password_reset.invalid_email') }</ErrorMessage>
          </InputWrapper>
          <ActionContainer>
            <SubmitButton small={isSmall} type="submit" onClick={handleSend} data-testid='requestPasswordReset-reset' >
              { t('request_password_reset.send') }
            </SubmitButton>
          </ActionContainer>
        </form>
      </Modal>
    );
  }
};

export default RequestPasswordResetPopUpModal;