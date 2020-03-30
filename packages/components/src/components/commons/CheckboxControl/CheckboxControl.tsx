import React from 'react';
import { CheckboxStyled, CheckboxLabel } from './styles';

interface CheckBoxControlProps {
  label?: any;
  size: string;
}

const CheckboxControl: React.SFC<CheckBoxControlProps> = ({
  label,
  size = 'big',
  ...rest
}) => {
  return (
    <CheckboxStyled
      label={<CheckboxLabel>{label}</CheckboxLabel>}
      size={size}
      {...rest}
    />
  );
};

export default CheckboxControl;
