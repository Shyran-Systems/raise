import React from 'react';
import {
  ConfirmWrapper,
  ConfirmHeader,
  OnboardButton,
  MainImage
} from '../styles';
import { updateToken } from '../../services';

const VerifiedError = ({ token }) => {
  const onUpdateToken = () => updateToken({ token });

  return (
    <ConfirmWrapper>
      <MainImage src="https://static.herodev.es/images/img_tokenerror.png" />
      <ConfirmHeader>This link has expired</ConfirmHeader>
      <p>Request a new link that will be sent to your inbox</p>
      <OnboardButton onClick={onUpdateToken}>Get a new link</OnboardButton>
    </ConfirmWrapper>
  );
};

export default VerifiedError;
