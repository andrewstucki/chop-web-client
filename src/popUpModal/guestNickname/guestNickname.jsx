// @flow
import React, { useState, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { SmallText, ActionContainer, Button, REGRESS } from '../styles';
import { InputField, InputLabel, ErrorMessage, InputWrapper, InputFieldWrapper, MessageWrapper } from '../login/styles';
import { IconWrapper, SubmitButton } from './styles';
import { Modal } from '../popUpModal';
import UpArrow from '../../icons/upArrow';
import { theme } from '../../styles';

type GuestNicknamePropsType = {
  togglePopUpModal: () => void,
  updateAndPost: (id: string, nickname: string) => void,
  login: () => void,
  id: string,
  isSmall: boolean,
};

type GuestNicknameState = {
  nickname: string,
  nicknameBlank: boolean,
  nicknameInvalid: boolean,
};

const GuestNicknamePopUpModal = (
  {
    togglePopUpModal,
    updateAndPost,
    login,
    id,
    isSmall,
  }: GuestNicknamePropsType
) => {
  const { t } = useTranslation('forms');

  const [values, setValues] = useState < GuestNicknameState > ({ nickname: '', nicknameBlank: false, nicknameInvalid: false });
  const nicknameRef = useRef(null);

  const onChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues({ ...values, [name]: value, nicknameBlank: false, emailInvalid: false });
  };

  const handlePost = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (values.nickname !== '') {
      const { current:currentNickname } = nicknameRef;

      const {
        nickname = currentNickname === null ? '' : currentNickname.value(),
      } = values;

      updateAndPost(id, nickname);
    } else {
      setValues(
        {
          ...values, 
          nicknameBlank: values.nickname === '',
          nicknameInvalid: false,
        }
      );
    }
  };
  return (
    <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} header={t('guest_nickname.title')} id="guestNickname-modal">
      <MessageWrapper>
        <SmallText>{ t('guest_nickname.description') }</SmallText>
      </MessageWrapper>
      <form onSubmit={handlePost}>
        <InputWrapper>
          <InputFieldWrapper>
            <InputField type="text" name="nickname" id="nickname" data-testid="guestNickname-nicknameField" value={values.nickname} ref={nicknameRef} onChange={onChange} error={values.nicknameBlank || values.nicknameInvalid}/>
            <InputLabel htmlFor="nickname">{ t('guest_nickname.nickname') }</InputLabel>
          </InputFieldWrapper>
          <ErrorMessage visible={values.nicknameBlank}>{ t('guest_nickname.blank_error') }</ErrorMessage>
          <ErrorMessage visible={values.nicknameInvalid}>{ t('guest_nickname.unavailable_error') }</ErrorMessage>
        </InputWrapper>
        <ActionContainer>
          <Button type='button' buttonType={REGRESS} onClick={login} data-testid='guestNickname-login' >
            { t('login.title') }
          </Button>
          <SubmitButton onClick={handlePost} small={isSmall} data-testid='guestNickname-post' >
            <IconWrapper>
              <UpArrow size={20} color={theme.colors.white}/>
            </IconWrapper>
            { t('guest_nickname.post') }
          </SubmitButton>
        </ActionContainer>
      </form>
    </Modal>
  );
};

export default GuestNicknamePopUpModal;