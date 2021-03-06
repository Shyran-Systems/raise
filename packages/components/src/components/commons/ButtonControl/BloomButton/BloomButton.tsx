import React from 'react';
import { Image } from 'semantic-ui-react';
import { ButtonStyled, ButtonContent, BloomImageWrapper } from './styles';
import { BloomButtonProps } from '../types';

const BloomButton: React.SFC<BloomButtonProps> = ({
  text,
  onClick,
  disabled = false,
  idAttr,
  className,
  size,
  fullWidth = false,
  ...rest
}: any) => (
  <ButtonStyled
    onClick={onClick}
    disabled={disabled}
    id={idAttr}
    className={className}
    size={size}
    fullWidth={fullWidth}
    {...rest}
  >
    <ButtonContent>
      <span>{text}</span>
      <BloomImageWrapper>
        <Image src={`${process.env.REACT_APP_HOST_IMAGES}/images/signup_bloom.png`} size="tiny" />
      </BloomImageWrapper>
    </ButtonContent>
  </ButtonStyled>
);

export default BloomButton;
