import numeral from '../../commons/numeral';

export const formatAmount = amount => numeral(amount).format();

export const calculateRepaymentAmount = (numberAmount, loanMaxMir, termMonths) =>
  numeral(numberAmount + (numberAmount * (loanMaxMir * termMonths)) / 100).format();

export const calculateNetLoan = numberAmount =>
  numeral(numberAmount - (numberAmount * 1) / 100).format();

export const calculateSystemFees = numberAmount => numeral((numberAmount * 1) / 100).format();

export const calculateTotalInterest = (numberAmount, loanMaxMir, termMonths) =>
  numeral((numberAmount * (loanMaxMir * termMonths)) / 100).format();

export const calculateTermFromSecondsToMonths = loanTerm => loanTerm / 60 / 60 / 24 / 30;


export const calculateMinAmount = (value, percent) => {
  const minAmount = value - value * (percent / 100);
  return minAmount >= 1 ? minAmount : 1;
};

export const calculateAPRFromMIR = mir => mir * 12;

export const calculateMIRFromAPR = apr => apr / 12;