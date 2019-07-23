// @flow
import React, { useState } from 'react';
import Modal from '../modal';
import UpArrow from '../../icons/upArrow';
import { useTranslation } from 'react-i18next';
import { SmallText, ActionContainer, Button, REGRESS } from '../styles';
import { InputField, InputLabel, ErrorMessage, InputWrapper, InputFieldWrapper, MessageWrapper } from '../login/styles';
import { IconWrapper, SubmitButton } from './styles';
import { theme } from '../../styles';

type ChatSetNicknamePropsType = {
  togglePopUpModal: () => void,
  updateAndPost: (id: string, nickname: string, action: string) => void,
  openLogin: () => void,
  id: string,
  isSmall: boolean,
};

type ChatSetNicknameState = {
  nickname: string,
  nicknameBlank: boolean,
  nicknameInvalid: boolean,
};

const ChatSetNicknamePopUpModal = (
  {
    togglePopUpModal,
    updateAndPost,
    openLogin,
    id,
    isSmall,
  }: ChatSetNicknamePropsType
) => {
  const { t } = useTranslation('forms');

  const [values, setValues] = useState < ChatSetNicknameState > ({ nickname: '', nicknameBlank: false, nicknameInvalid: false });

  const onChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues({ ...values, [name]: value, nicknameBlank: false, nicknameInvalid: false });
  };

  const handlePost = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (values.nickname !== '') {
      updateAndPost(id, values.nickname, 'chat');
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
    <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} header={t('chat_set_nickname.title')} showDismissButton={true} id="chatSetNickname-modal">
      <MessageWrapper>
        <SmallText>{ t('chat_set_nickname.description') }</SmallText>
      </MessageWrapper>
      <form onSubmit={handlePost}>
        <InputWrapper>
          <InputFieldWrapper>
            <InputField type="text" name="nickname" id="nickname" data-testid="chatSetNickname-nicknameField" value={values.nickname} onChange={onChange} error={values.nicknameBlank || values.nicknameInvalid} autoFocus/>
            <InputLabel htmlFor="nickname">{ t('chat_set_nickname.nickname') }</InputLabel>
          </InputFieldWrapper>
          <ErrorMessage visible={values.nicknameBlank}>{ t('chat_set_nickname.blank_error') }</ErrorMessage>
          <ErrorMessage visible={values.nicknameInvalid}>{ t('chat_set_nickname.unavailable_error') }</ErrorMessage>
        </InputWrapper>
        <ActionContainer>
          <Button type='button' buttonType={REGRESS} onClick={openLogin} data-testid='chatSetNickname-login' >
            { t('login.title') }
          </Button>
          <SubmitButton onClick={handlePost} small={isSmall} data-testid='chatSetNickname-post' >
            <IconWrapper>
              <UpArrow size={20} color={theme.colors.white}/>
            </IconWrapper>
            { t('chat_set_nickname.post') }
          </SubmitButton>
        </ActionContainer>
      </form>
    </Modal>
  );
};

export default ChatSetNicknamePopUpModal;
