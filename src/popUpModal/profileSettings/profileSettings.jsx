// @flow
import React, { useState, useEffect } from 'react';
import Modal from '../modal';
import Avatar from '../../avatar';
import InputField from '../../components/inputField';
import { useTranslation } from 'react-i18next';
import {
  Wrapper,
  ButtonWrapper,
  AvatarWrapper,
  FieldWrapper,
  FileInput,
  ChangeAvatarWrapper,
  FileInputLabel,
} from './styles';
import Button, { BUTTON_MEDIUM, BUTTON_PRIMARY } from '../../components/button';
import { privateSubscriberToSharedSubscriber, type PrivateSubscriberType, type SubscriberInputType } from '../../subscriber/dux';
import Actionable from '../../components/Actionable';
import { Button as DangerButton, DANGER } from '../styles';

type ProfileSettingsProps = {|
  currentSubscriber: PrivateSubscriberType,
  togglePopUpModal: () => void,
  isSmall: boolean,
  updateSubscriber: (id:string, input:SubscriberInputType) => void,
  uploadAvatar: (id:string, formData: FormData) => void,
  promptRemoveAvatar: () => void,
  promptDeleteAccount: () => void,
|};

const ProfileSettings = ({ currentSubscriber, togglePopUpModal, isSmall, updateSubscriber, uploadAvatar, promptRemoveAvatar, promptDeleteAccount }:ProfileSettingsProps) => {
  const { t } = useTranslation('forms');
  const [values, setValues] = useState <SubscriberInputType> ({
    nickname: currentSubscriber.nickname,
    firstName: currentSubscriber.firstName,
    lastName: currentSubscriber.lastName,
    email: currentSubscriber.email,
    phoneNumber: currentSubscriber.phoneNumber,
  });

  const [avatarLoading, setAvatarLoading] = useState<boolean>(false);

  const handleSubscriberChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSave = () => {
    updateSubscriber(currentSubscriber.id, values);
  };

  const sharedSubscriber = privateSubscriberToSharedSubscriber(currentSubscriber);

  const handleAvatarUpload = event => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('avatar', event.target.files[0]);
      uploadAvatar(currentSubscriber.id, formData);
      setAvatarLoading(true);
    }
  };

  useEffect(() => {
    setAvatarLoading(false);
  }, [currentSubscriber.avatar]);

  const hasAvatar = currentSubscriber.avatar && currentSubscriber.avatar.indexOf('missing.png') === -1;

  return (
    <Modal id='profileSettings' isSmall={isSmall} togglePopUpModal={togglePopUpModal} includePadding={false} showDismissButton>
      <Wrapper>
        <AvatarWrapper>
          <Avatar subscriber={sharedSubscriber} size='xlarge' id='profileSettings-avatar' loading={avatarLoading} />
          <FileInput type='file' id='avatar' data-testid='avatar-upload' onChange={handleAvatarUpload}/>
          {
            hasAvatar ?
              <ChangeAvatarWrapper>
                <FileInputLabel htmlFor="avatar" css='margin-right: 1rem'>{t('profile.photo_change')}</FileInputLabel>
                <Actionable onClick={promptRemoveAvatar}>
                  <div data-testid='removeAvatar'>{t('profile.photo_remove')}</div>
                </Actionable>
              </ChangeAvatarWrapper>
              :
              <FileInputLabel htmlFor="avatar">{t('profile.photo_add')}</FileInputLabel>
          }
          <InputField
            type='text'
            name='nickname'
            label={t('profile.nickname')}
            onChange={handleSubscriberChange}
            value={values.nickname}
            autoComplete='nickname'
          />
        </AvatarWrapper>

        <FieldWrapper>
          <InputField
            type='text'
            name='firstName'
            label={t('profile.first_name')}
            onChange={handleSubscriberChange}
            value={values.firstName}
            autoComplete='given-name'
          />

          <InputField
            type='text'
            name='lastName'
            label={t('profile.last_name')}
            onChange={handleSubscriberChange}
            value={values.lastName}
            autoComplete='family-name'
          />

          <InputField
            type='email'
            name='email'
            label={t('profile.email')}
            onChange={handleSubscriberChange}
            value={values.email}
            autoComplete='email'
          />

          <InputField
            type='tel'
            name='phoneNumber'
            label={t('profile.phone_number')}
            onChange={handleSubscriberChange}
            value={values.phoneNumber}
            autoComplete='tel'
            tooltipContent={<div>{t('profile.phone_number_tooltip')}</div>}
          />
        </FieldWrapper>

        <ButtonWrapper>
          <DangerButton buttonType={DANGER} onClick={promptDeleteAccount} css='padding-left: 0' data-testid='profile.delete_account'>
            { t('profile.delete_account') }
          </DangerButton>
          <Button
            onClick={handleSave}
            variant={BUTTON_PRIMARY}
            size={BUTTON_MEDIUM}
          >
            { t('profile.save') }
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Modal>
  );
};

export default React.memo<ProfileSettingsProps>(ProfileSettings);
