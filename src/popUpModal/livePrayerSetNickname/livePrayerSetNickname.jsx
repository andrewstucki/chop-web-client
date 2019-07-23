// @flow
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { ActionContainer, Button, REGRESS } from '../styles';
import { InputField, InputLabel, ErrorMessage, InputWrapper, InputFieldWrapper, SubmitButton } from '../login/styles';
import Modal from '../modal';

type LivePrayerSetNicknamePropsType = {
  togglePopUpModal: () => void,
  updateAndRequestPrayer: (id: string, nickname: string, action: string) => void,
  login: () => void,
  id: string,
  isSmall: boolean,
};

type LivePrayerSetNicknameState = {
  nickname: string,
  nicknameBlank: boolean,
  nicknameInvalid: boolean,
};

const LivePrayerSetNicknamePopUpModal = (
  {
    togglePopUpModal,
    updateAndRequestPrayer,
    login,
    id,
    isSmall,
  }: LivePrayerSetNicknamePropsType
) => {
  const { t } = useTranslation('forms');

  const [values, setValues] = useState < LivePrayerSetNicknameState > ({ nickname: '', nicknameBlank: false, nicknameInvalid: false });

  const onChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues({ ...values, [name]: value, nicknameBlank: false, nicknameInvalid: false });
  };

  const handleSubmit = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (values.nickname !== '') {
      updateAndRequestPrayer(id, values.nickname, 'prayer');
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
    <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} header={t('live_prayer_set_nickname.title')} showDismissButton={true} id="livePrayerSetNickname-modal">
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputFieldWrapper>
            <InputField type="text" name="nickname" id="nickname" data-testid="livePrayerSetNickname-nicknameField" value={values.nickname} onChange={onChange} error={values.nicknameBlank || values.nicknameInvalid}/>
            <InputLabel htmlFor="nickname">{ t('live_prayer_set_nickname.nickname') }</InputLabel>
          </InputFieldWrapper>
          <ErrorMessage visible={values.nicknameBlank} data-testid='livePrayerSetNickname-blankError'>{ t('live_prayer_set_nickname.blank_error') }</ErrorMessage>
          <ErrorMessage visible={values.nicknameInvalid}>{ t('live_prayer_set_nickname.unavailable_error') }</ErrorMessage>
        </InputWrapper>
        <ActionContainer>
          <Button type='button' buttonType={REGRESS} onClick={login} data-testid='livePrayerSetNickname-login' >
            { t('login.title') }
          </Button>
          <SubmitButton onClick={handleSubmit} small={isSmall} data-testid='livePrayerSetNickname-post' >
            { t('live_prayer_set_nickname.pray') }
          </SubmitButton>
        </ActionContainer>
      </form>
    </Modal>
  );
};

export default LivePrayerSetNicknamePopUpModal;
