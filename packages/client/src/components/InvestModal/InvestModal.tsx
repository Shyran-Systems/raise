import React, { useState } from 'react';
import daggy from 'daggy';
// import { Modal as SemanticModal } from 'semantic-ui-react';
import { InvestModalProps } from './types';
import { fromWei } from 'web3-utils';
import { useAppContext } from '../../contexts/AppContext';
import { useRootContext } from '../../contexts/RootContext';
import useRouter from '../../hooks/useRouter';
import InvestState from './InvestState';
import ProcessingState from './ProcessingState';
import SuccessState from './SuccessState';
import useGoogleTagManager, { TMEvents } from '../../hooks/useGoogleTagManager';
import { LenderButton, Modal, ModalContent } from './InvestModal.styles';
import { match, ANY } from 'pampy';

const UI = daggy.taggedSum('UI', {
  Confirm: [],
  Processing: [],
  Success: []
});

const InvestModal: React.SFC<InvestModalProps> = ({ loan, className }) => {
  const {
    modalRefs,
    web3Status: { hasProvider, unlocked, accountMatches, networkMatches }
  }: any = useAppContext();
  const { history }: any = useRouter();
  const {
    store: {
      user: {
        details: { kyc_status }
      },
      auth: {
        login: { logged: isLogged }
      }
    },
    actions: {
      onboarding: { showOnboarding }
    }
  }: any = useRootContext();
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState(UI.Confirm);
  const [investment, setInvestment] = useState(0);
  const tagManager = useGoogleTagManager();
  const invested = !!(loan.lenderAmount && Number(fromWei(loan.lenderAmount)));
  // prettier-ignore
  const connected = (hasProvider && unlocked && accountMatches && networkMatches);
  const userActivated = connected && kyc_status === 3;

  const buttonText = match(
    [connected, invested],
    [ANY, false],
    () => 'INVEST',
    [false, true],
    () => 'INVEST MORE',
    ANY,
    () => 'INVEST'
  );

  const openModal = () => {
    if (isLogged) {
      setStage(UI.Confirm);
      setOpen(true);
    } else {
      const isBorrowerProfile = history.location.pathname.split('/').filter(pt => pt === 'c');
      tagManager.sendEventCategory(
        'Card',
        TMEvents.Click,
        isBorrowerProfile ? 'borrower_profile' : 'marketplace'
      );
      if (window.fbq) {
        window.fbq('trackCustom', 'Card', {
          type: isBorrowerProfile ? 'borrower_profile' : 'marketplace'
        });
      }
      showOnboarding();
    }
  };
  const closeModal = () => {
    setOpen(false);
  };

  const getInvestAction = stage => {
    return stage.cata({
      Confirm: () => (
        <InvestState loan={loan} setStage={setStage} setInvestment={setInvestment} ui={UI} />
      ),
      Processing: () => (
        <ProcessingState loan={loan} investment={investment} ui={UI} setStage={setStage} />
      ),
      Success: () => <SuccessState setStage={setStage} ui={UI} closeModal={closeModal} />
    });
  };
  return (
    <>
      <LenderButton
        id="btn-lender-open"
        className={className}
        fluid
        onClick={openModal}
        disabled={isLogged ? !userActivated : false}
      >
        {buttonText}
      </LenderButton>
      <Modal open={open} onClose={closeModal} size="small" mountNode={modalRefs.current}>
        <ModalContent>{getInvestAction(stage)}</ModalContent>
      </Modal>
    </>
  );
};

export default InvestModal;
