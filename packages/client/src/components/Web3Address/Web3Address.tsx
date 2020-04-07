import React, { useCallback } from 'react';
import { Icon } from 'semantic-ui-react';
import { LabelWeb3 } from './Web3Address.styles';
import { useRootContext } from '../../contexts/RootContext';
import { useAppContext } from '../../contexts/AppContext';
import { NULL_ADDRESS } from '../../commons/constants';
// import useWeb3Checker from '../../hooks/useWeb3Checker';

const Web3Address = ({ account = null, border = true }: any) => {
  const {
    store: {
      config: { network },
      user: {
        cryptoAddress: { address }
      }
    }
  }: any = useRootContext();
  const {
    web3Status: { networkMatches }
  }: any = useAppContext();

  const iconColor = networkMatches ? 'green' : 'red';
  const currentAddress = account || address || NULL_ADDRESS;

  const getShortAddress = useCallback(() => {
    return `${currentAddress.substring(0, 6)}...${currentAddress.substring(
      currentAddress.length - 4
    )}`;
  }, [currentAddress]);

  return (
    <LabelWeb3 border={border}>
      <Icon name="circle" color={iconColor} alt={network} />
      {getShortAddress()}
    </LabelWeb3>
  );
};

export default Web3Address;
