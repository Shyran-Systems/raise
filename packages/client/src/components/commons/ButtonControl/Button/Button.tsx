import React from 'react';
import { ButtonStyled } from './styles';

const Button = ({ text, onClick, disabled = false, idAttr }) => {
  return (
    <ButtonStyled onClick={onClick} disabled={false} id={idAttr}>
      {text}
    </ButtonStyled>
  );
};

export default Button;
