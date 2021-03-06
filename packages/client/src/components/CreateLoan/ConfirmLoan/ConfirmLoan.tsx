import React from 'react';
import { isMobile } from 'react-device-detect';
import { Button, CheckboxControl } from '@raisehq/components';

import {
  Divider,
  DividerConfirmLoan,
  LoanConfirmation,
  LoanResume,
  AmountRow,
  AmountDescription,
  AmountNumber,
  FirstContainer,
  SecondContainer,
  HeaderRow,
  CheckboxRow,
  ButtonContainer
} from '../CreateLoan.styles';

const ConfirmLoan = ({ values, onToggleTerms, onToggleAuthTerms, onSave }: any) => {
  const {
    formattedAmount,
    systemFees,
    netLoan,
    totalInterest,
    repaymentAmount,
    loan,
    amountValidation,
    numberAmount,
    termsCond,
    authTerms,
    selectedCoinType,
    operatorFee,
    borrowerCompany,
    repaymentType
  } = values;
  return (
    <LoanConfirmation>
      <HeaderRow>
        <AmountRow>
          <AmountDescription bold fontSize={16}>
            Summary
          </AmountDescription>
        </AmountRow>
      </HeaderRow>
      <LoanResume>
        <FirstContainer>
          {!isMobile && <DividerConfirmLoan />}
          <AmountRow>
            <AmountDescription>Cryptocurrency</AmountDescription>
            <AmountNumber>{selectedCoinType}</AmountNumber>
          </AmountRow>
          {!isMobile && <DividerConfirmLoan />}
          <AmountRow>
            <AmountDescription>Repayment</AmountDescription>
            <AmountNumber>{repaymentType}</AmountNumber>
          </AmountRow>
          {!isMobile && <DividerConfirmLoan />}
          <AmountRow>
            <AmountDescription>Loan amount</AmountDescription>
            <AmountNumber>{formattedAmount}</AmountNumber>
          </AmountRow>
          {!isMobile && <DividerConfirmLoan />}
          <AmountRow>
            <AmountDescription>{`System fees (${operatorFee}%)`}</AmountDescription>
            <AmountNumber>{`-${systemFees}`}</AmountNumber>
          </AmountRow>
          {!isMobile && <DividerConfirmLoan />}
          <AmountRow>
            <AmountDescription>Net loan proceeds</AmountDescription>
            <AmountNumber bold>{netLoan}</AmountNumber>
          </AmountRow>
        </FirstContainer>
        {!isMobile && <Divider />}
        {isMobile && <Divider vertical />}
        <SecondContainer>
          <AmountRow>
            <AmountDescription>Principal</AmountDescription>
            <AmountNumber>{formattedAmount}</AmountNumber>
          </AmountRow>
          {!isMobile && <DividerConfirmLoan />}
          <AmountRow>
            <AmountDescription>Interest</AmountDescription>
            <AmountNumber>{totalInterest}</AmountNumber>
          </AmountRow>
          {!isMobile && <DividerConfirmLoan />}
          <AmountRow>
            <AmountDescription>Total repayment amount</AmountDescription>
            <AmountNumber bold>{repaymentAmount}</AmountNumber>
          </AmountRow>
        </SecondContainer>
      </LoanResume>
      {!isMobile && <Divider />}
      <AmountRow>
        <CheckboxRow>
          <CheckboxControl
            size="small"
            id="btn-check-term-conditions"
            onChange={onToggleTerms}
            label="I agree to the Terms and Conditions of the Loan Agreement"
          />
        </CheckboxRow>
      </AmountRow>
      <AmountRow>
        <CheckboxRow>
          <CheckboxControl
            size="small"
            id="btn-check-auth-term-conditions"
            onChange={onToggleAuthTerms}
            label={`I hereby declare under penalty of perjury that I am an authorized person of ${borrowerCompany.companyName}`}
          />
        </CheckboxRow>
      </AmountRow>

      <ButtonContainer>
        <Button
          idAttr="btn-create"
          className="btn-confirm-loan"
          onClick={onSave}
          text="Confirm"
          type="secondary"
          size="large"
          fullWidth
          disabled={
            amountValidation.error ||
            loan.term === 0 ||
            loan.mir === 0 ||
            numberAmount === 0 ||
            !termsCond ||
            !authTerms
          }
        />
      </ButtonContainer>
    </LoanConfirmation>
  );
};

export default ConfirmLoan;
