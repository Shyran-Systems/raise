import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import daggy from 'daggy';
import BN from 'bn.js';
import { useRootContext } from '../../contexts/RootContext';
import { useSidebarContext } from '../../contexts/SidebarContext';
import VerifyKycModal from '../InvestModal/VerifyKycState';
import useGetCoin from '../../hooks/useGetCoin';
import { useAppContext } from '../../contexts/AppContext';

const InvestState = lazy(() => import('../InvestModal/InvestState'));
const ProcessingState = lazy(() => import('../InvestModal/ProcessingState'));
const SuccessState = lazy(() => import('../InvestModal/SuccessState'));

const UI = daggy.taggedSum('UI', {
  Kyc: [],
  Confirm: [],
  Processing: [],
  Success: []
});

const InvestSidebar = () => {
  const {
    web3Status: { hasProvider, unlocked, accountMatches, networkMatches }
  }: any = useAppContext();
  const {
    actions: { setDisplay },
    state: { loanId }
  } = useSidebarContext();
  const {
    store: {
      loan: { suggested },
      user: {
        details: { kyc_status: kycStatus }
      }
    }
  }: any = useRootContext();

  const loan = useMemo(() => suggested.find(({ id }) => id === loanId), [loanId]);

  const coin = useGetCoin(loan);
  const [stage, setStage] = useState(UI.Kyc);
  const [investment, setInvestment] = useState(0);
  const [inputTokenAmount, setInputTokenAmount] = useState<BN>(new BN('0'));

  const [selectedCoin, setCoin] = useState(coin?.text);
  const connected = hasProvider && unlocked && accountMatches && networkMatches;

  const userActivated = connected && kycStatus === 3;

  const closeSidebar = () => {
    setDisplay(false);
  };

  useEffect(() => {
    // Reset
    setStage(UI.Kyc);
    setInvestment(0);
    setInputTokenAmount(new BN('0'));
    // Change loan
    if (loanId) {
      if (userActivated) {
        setStage(UI.Confirm);
      }
    }
  }, [loanId]);

  const getInvestAction = (current: any) =>
    current.cata({
      Kyc: () => <VerifyKycModal />,
      Confirm: () => (
        <InvestState
          loan={loan}
          loanCoin={coin}
          setStage={setStage}
          setInvestment={setInvestment}
          inputTokenAmount={inputTokenAmount}
          setInputTokenAmount={setInputTokenAmount}
          setCoin={setCoin}
          selectedCoin={selectedCoin}
          ui={UI}
          closeModal={closeSidebar}
        />
      ),
      Processing: () => (
        <ProcessingState
          loan={loan}
          loanCoin={coin}
          investment={investment}
          inputTokenAmount={inputTokenAmount}
          ui={UI}
          setStage={setStage}
          selectedCoin={selectedCoin}
          closeModal={closeSidebar}
        />
      ),
      Success: () => <SuccessState setStage={setStage} ui={UI} closeModal={closeSidebar} />
    });

  return (
    <>
      <Suspense fallback={<div>...</div>}>{getInvestAction(stage)}</Suspense>
    </>
  );
};

export default InvestSidebar;
