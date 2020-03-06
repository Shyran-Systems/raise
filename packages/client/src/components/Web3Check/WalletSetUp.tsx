import React, { useEffect, useState } from 'react';
import {
  CardTitle,
  SelectYourWalletTitle,
  Web3CheckWalletWrapper,
  GoBack,
  WalletIcon,
  SetUpSubtitle,
  OtherWalletsText
} from './Web3Check.styles';

import OnboardingProgressBar from '../OnboardingProgressBar';
import { isMobile } from 'react-device-detect';
import { WalletButton } from '../WalletButton';
import GoBackButton from '../GoBackButton';
import { getWalletName } from '../../utils';
import useGoogleTagManager, { TMEvents } from '../../hooks/useGoogleTagManager';
import useWeb3 from '../../hooks/useWeb3';
import { useRootContext } from '../../contexts/RootContext';
import CryptoWallets from '../../commons/cryptoWallets';

const WalletSetUp = ({ onNext, onBack }: any) => {
  const {
    store: {
      config: { network, networkId }
    }
  }: any = useRootContext();
  const tagManager = useGoogleTagManager('Wallet');
  const { web3, getDefaultWeb3, connectWallet }: any = useWeb3();
  const [defaultWallet, setDefaultWallet] = useState();

  useEffect(() => {
    setDefaultWallet(getDefaultWeb3());
  }, [web3]);

  const handlerWallet = walletSelected => async () => {
    const walletName = getWalletName(walletSelected).toLowerCase();
    tagManager.sendEvent(TMEvents.Click, 'wallet_attempt', walletName);

    if (
      (defaultWallet.name === -1 && walletName === 'metamask') ||
      (walletName === 'metamask' && defaultWallet.name !== CryptoWallets.Metamask)
    ) {
      window.open('http://metamask.app.link/', '_blank');
    } else {
      try {
        await connectWallet(walletSelected, network, networkId);
        onNext('WalletSetUp');
      } catch (error) {
        // console.log(error)
      }
    }
  };

  return (
    <Web3CheckWalletWrapper>
      <OnboardingProgressBar step={1} isMobile={isMobile} />
      <SelectYourWalletTitle>
        <CardTitle>Set up your wallet</CardTitle>
        <SetUpSubtitle>
          If you don't have a wallet there is no problem, click on the button bellow and create an
          account in Coinbase. It's fast, easy and secure.
        </SetUpSubtitle>
      </SelectYourWalletTitle>
      <WalletIcon src={`${process.env.REACT_APP_HOST_IMAGES}/images/coinbase.png`} />

      <WalletButton
        onClickAction={handlerWallet(CryptoWallets.Coinbase)}
        walletName="Continue with Coinbase"
        green={true}
      />
      <OtherWalletsText>You can also use:</OtherWalletsText>
      <WalletButton
        onClickAction={handlerWallet(CryptoWallets.Metamask)}
        walletName="Metamask"
        walletIcon={`${process.env.REACT_APP_HOST_IMAGES}/images/metamask.png`}
      />
      <GoBack>
        <GoBackButton onClickAction={onBack} />
      </GoBack>
    </Web3CheckWalletWrapper>
  );
};

export default WalletSetUp;
