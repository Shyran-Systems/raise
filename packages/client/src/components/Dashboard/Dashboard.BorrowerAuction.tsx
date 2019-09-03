import React, { Fragment } from 'react';
import { Card } from '@raisehq/components';
import useCalculations from './Dashboard.useCalc';
import { loanStatus, loanStatusColors } from '../../commons/loanStatus';
import Amount from './Dashboard.Amount';

const Auction = ({ auction }: { auction: any }) => {
  const calcs = useCalculations(auction);
  const {
    principal,
    netBalance,
    maxAmount,
    times,
    interest,
    systemFees,
    borrowerDebt,
    numbers
  } = calcs;
  const { state } = auction;
  return (
    <Card>
      <Card.Header title="Raised amount" amount={<Amount principal={principal} />} />
      <Card.Graph
        color="#00DA9E"
        currentAmount={numbers.principal}
        totalAmount={numbers.maxAmount}
      />
      <Fragment>
        <Card.Tooltip />
        <Card.Badge color={loanStatusColors[state]}>{loanStatus[state]}</Card.Badge>
      </Fragment>
      <Card.Grid>
        <Card.Row title="Investors" content={auction.investorCount} />
        <Card.Row title="Current APR" content={interest} />
        <Card.Row title="Days Left" content={times.auctionTimeLeft} />
      </Card.Grid>
      <Card.Separator />
      <Card.Grid nobottom>
        <Card.Row title="System Fees" content={`${systemFees} DAI`} />
        <Card.Row title="Loan Term" content={`${times.loanTerm} `} />
        <Card.Row title="Net Loan Proceeds" content={`${netBalance} DAI`} />
        <Card.Row title="Target Amount" content={`${maxAmount} DAI`} />
        <Card.Row title="Max APR" content={interest} />
        <Card.Row title="Total Repayment" content={`${borrowerDebt} DAI`} />
      </Card.Grid>
    </Card>
  );
};

export default Auction;