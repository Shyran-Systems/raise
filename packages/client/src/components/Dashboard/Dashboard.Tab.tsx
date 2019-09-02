import React from 'react';
import { DashboardTab, NoResults } from './Dashboard.styles';
import Auction from './Dashboard.Auction';
import Loan from './Dashboard.Loan';
import BorrowerLoan from './Dashboard.BorrowerLoan';
import LenderLoan from './Dashboard.LenderLoan';
import BorrowerAuction from './Dashboard.BorrowerAuction';
import Suggested from './Dashboard.Loan';
import useActionState from './Dashboard.useAuctionState';
import { match, ANY } from 'pampy';
const Card = {
  auction: Auction,
  loan: Loan,
  suggested: Suggested,
  borrowerLoan: BorrowerLoan,
  borrowerAuction: BorrowerAuction
};

const renderedLoans = (auctions, type) => auctions.map(auction => {
  const conditions = [type, auction.state];
  const CardComponent = match(conditions,
    ['borrower', 0], () => BorrowerAuction,
    ['borrower', 1], () => BorrowerAuction,
    ['borrower', ANY], () => BorrowerLoan,
    ['lender', 0], () => BorrowerAuction,
    ['lender', 1], () => BorrowerAuction,
    ['lender', ANY], () => LenderLoan,
    ANY, () => Card[type]
  )
  return (
    <CardComponent key={auction.id} auction={auction} />
  )
});

const Tab = ({ auctions, states, type }) => {
  console.log(auctions, states)
  const auctionsState: any = useActionState(auctions, states);


  return auctionsState.cata({
    Loading: () => <DashboardTab.Pane loading />,
    Success: filteredAuctions => {
      console.log(filteredAuctions)
      return (
      <DashboardTab.Pane>
        {renderedLoans(filteredAuctions, type)}
      </DashboardTab.Pane>
    )},
    Empty: () => (
      <DashboardTab.Pane>
        <NoResults>No results</NoResults>
      </DashboardTab.Pane>
    )
  });
};

export default Tab;
