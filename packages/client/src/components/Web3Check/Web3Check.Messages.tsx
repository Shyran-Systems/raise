import React, { useContext } from 'react';
import AppContext from '../AppContext';
import Web3Address from '../Web3Address';
import useWeb3 from '../../hooks/useWeb3';
import useGoogleTagManager, { TMEvents } from '../../hooks/useGoogleTagManager';
import { Href } from '../Layout/Layout.styles';
import { getWalletName } from '../../utils';

import {
  StyledAddress,
  Description,
  HelpMessage,
  ButtonGreen,
  AddressContainer,
  CardDescription
} from './Web3Check.styles';

const NeedHelp = ({ href }: any) => (
  <HelpMessage>
    <Href target="_blank" href={href}>
      Need help?
    </Href>
  </HelpMessage>
);

// @ts-ignore
const NetworkNotMatch = ({ targetNetwork, currentNetwork }: any) => (
  <Description>
    <h3>Change the network</h3>
    <p>
      Please switch to one of the following networks in your wallet:
      <b> {targetNetwork.join(', ')}</b>
    </p>
    <NeedHelp href="https://www.raise.it/help" />
  </Description>
);
// @ts-ignore
const AccountNotVerified = ({ currentAddress, uploadSignature }: any) => (
  <Description>
    <p>
      Check your Wallet and sign a message to bind this address to your Raise account. You will be
      able to operate only with this address.
    </p>
    <div />
    <ButtonGreen onClick={uploadSignature} double>
      Sign message with
      <AddressContainer>
        <StyledAddress account={currentAddress} />
      </AddressContainer>
    </ButtonGreen>
    <NeedHelp href="https://www.raise.it/help" />
  </Description>
);
// @ts-ignore
const AccountNotMatchNotice = ({ verifiedAddress, walletId }: any) => (
  <Description>
    <h3>Address does not match</h3>
    <p>Make sure you are using {getWalletName(walletId)} with your registered address:</p>
    <div>
      <Web3Address account={verifiedAddress} />
    </div>
    <NeedHelp href="https://www.raise.it/help" />
  </Description>
);

const Success = () => (
  <CardDescription textAlign="center" style={{ fontSize: '24px' }}>
    <span role="img" aria-label="party" className="emojis">
      🎉🎉🎉
    </span>
    All set!
  </CardDescription>
);

const CurrentNotice = () => {
  // @ts-ignore
  const {
    actions: {
      // @ts-ignore
      blockchain: { uploadSignature }
    },
    // history,
    store: {
      user: {
        // @ts-ignore
        cryptoAddress: { address: verifiedAddress, cryptotypeId }
      }
    },
    web3Status: { networkMatches, accountMatches, walletNetwork, targetNetwork, walletAccount }
  }: any = useContext(AppContext);
  const tagManager = useGoogleTagManager('Wallet');
  const { getCurrentProviderName, requestSignature } = useWeb3();

  const handleUploadSignature = async () => {
    try {
      const { address, signature } = await requestSignature();
      await uploadSignature(address, getCurrentProviderName(), signature);
      tagManager.sendEvent(
        TMEvents.Submit,
        'new_wallet',
        getWalletName(cryptotypeId).toLowerCase()
      );
      if (window.fbq) {
        window.fbq('trackCustom', 'new_wallet', {
          type: getWalletName(cryptotypeId).toLowerCase()
        });
      }
      // history.push('/deposit');
    } catch (error) {
      console.error('[Web3Check.Message][HandleUploadSignature] Error : ', error);
    }
  };

  if (!verifiedAddress) {
    return (
      <AccountNotVerified currentAddress={walletAccount} uploadSignature={handleUploadSignature} />
    );
  }
  if (!networkMatches) {
    return <NetworkNotMatch targetNetwork={targetNetwork} currentNetwork={walletNetwork} />;
  }
  if (!accountMatches) {
    return <AccountNotMatchNotice verifiedAddress={verifiedAddress} walletId={cryptotypeId} />;
  }
  return <Success />;
};

export default CurrentNotice;
