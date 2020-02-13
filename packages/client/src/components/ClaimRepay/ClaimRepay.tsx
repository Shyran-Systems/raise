import React, { useState, createContext } from 'react';
import daggy from 'daggy';
import { Modal as SemanticModal } from 'semantic-ui-react';
import { InvestModalProps } from './types';
import { tradeTokensForExactTokens } from '@uniswap/sdk';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import { fromWei, toWei } from 'web3-utils';

import useClaimRepay from './useClaimRepay';
import ConfirmStage from './stages/Confirm';
import ErrorStage from './stages/Retry';
import SuccessStage from './stages/Success';

import { Modal } from '../ClaimLoan/ClaimLoan.styles';

import { LenderButton, ExitButton } from '../InvestModal/InvestModal.styles';

export const ClaimRepayContext = createContext({});

export const Stages = daggy.taggedSum('UI', {
  Confirm: [],
  Success: [],
  Error: []
});

const ClaimRepayCTA: React.SFC<InvestModalProps> = ({ loan }) => {
  const [open, setOpen] = useState(false);
  const { stage, setStage, ...rest }: any = useClaimRepay(loan, open);
  const [swap, setSwap] = useState(0);

  const getMarketSwap = async () => {
    try {
      const tradeDetails = await tradeTokensForExactTokens(
        '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI address
        '0x10bA8C420e912bF07BEdaC03Aa6908720db04e0c', // RAISE address
        toWei('200'), // output tokens (200 RAISE)
        1 // chain id, 1 mainnet
      );

      const totalDaiPrice = fromWei(tradeDetails.inputAmount.amount.toString());

      return totalDaiPrice;
    } catch (error) {
      throw error;
    }
  };

  useAsyncEffect(async () => {
    try {
      const market = await getMarketSwap();
      setSwap(Number(market));
    } catch (error) {
      throw error;
    }
  }, []);

  const openModal = () => {
    setStage(Stages.Confirm);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const getStage = stage => {
    return stage.cata({
      Confirm: () => <ConfirmStage />,
      Success: () => <SuccessStage />,
      Error: () => <ErrorStage />
    });
  };

  return (
    <ClaimRepayContext.Provider value={{ loan, setStage, closeModal, swap, ...rest }}>
      <LenderButton onClick={openModal}>Withdraw</LenderButton>
      <Modal open={open} size="small" onClose={closeModal}>
        <SemanticModal.Content>
          {getStage(stage)}

          <ExitButton name="close" color="black" onClick={closeModal} />
        </SemanticModal.Content>
      </Modal>
    </ClaimRepayContext.Provider>
  );
};

export default ClaimRepayCTA;
