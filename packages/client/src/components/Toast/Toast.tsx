import React from 'react';
import { ToastCustomContainer, ToastText, TxLink, StyledToastContainer } from './styles';
import { useRootContext } from '../../contexts/RootContext';
import toastMessages from '../../helpers/toastMessages';

const format = (text: string, params: any) => {
  if (!params || params.length === 0) {
    return text;
  }
  let result = text;
  for (let i = 0; i < params.length; i + 1) {
    result = result.replace(new RegExp(`\\{${i}\\}`, 'g'), params[i]);
  }

  return result;
};

const Toast = ({ params, tx, state }: any) => {
  const {
    store: {
      config: { network }
    }
  }: any = useRootContext();

  const getText = () => {
    if (!params) {
      return 'Processing transaction';
    }
    const { id, vars }: any = params;
    const unparsedText = toastMessages[state][id];
    const parsedText = format(unparsedText, vars);
    return parsedText;
  };

  const createLink = transaction =>
    `https://${
      network && network !== 'mainnet' ? `${network}.` : ''
    }etherscan.io/tx/${transaction}`;

  return (
    <ToastCustomContainer>
      <ToastText>{getText()}</ToastText>
      <TxLink href={createLink(tx)} target="_blank">
        View on Etherscan
      </TxLink>
    </ToastCustomContainer>
  );
};

export { StyledToastContainer };

export default Toast;
