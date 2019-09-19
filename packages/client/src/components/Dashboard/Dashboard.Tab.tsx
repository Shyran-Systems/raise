import React, { useState, useEffect } from 'react';
import daggy from 'daggy';
import { match, ANY } from 'pampy';
import { DashboardTab, NoResults } from './Dashboard.styles';
import BorrowerLoan from '../Cards/BorrowerLoan';
import BorrowerAuction from '../Cards/BorrowerAuction';
import { getActiveAuctions } from '../../utils/loanUtils';
import useInterval from '../../hooks/useInterval';
import LenderAuction from './Dashboard.LenderAuction';
import LenderLoan from './Dashboard.LenderLoan';
import SuggestedAuction from './Dashboard.Suggested';

const renderedLoans = (auctions, type) =>
  auctions.map(auction => {
    const conditions = [type, auction.state];
    const CardComponent = match(
      conditions,
      ['borrower', 0],
      () => BorrowerAuction,
      ['borrower', 1],
      () => BorrowerAuction,
      ['borrower', ANY],
      () => BorrowerLoan,
      ['lender', 0],
      () => LenderAuction,
      ['lender', ANY],
      () => LenderLoan,
      ['suggested', ANY],
      () => SuggestedAuction,
    );
    return <CardComponent key={auction.id} auction={auction} />;
  });

const Auctions = daggy.taggedSum('Auctions', {
  Loading: [],
  Success: [{}],
  Empty: []
});

const Tab = ({ auctions, states, type }) => {
  const [filteredAuctions, setFilteredAuctions] = useState();
  const [tabState, setTabState]: any = useState(Auctions.Loading);

  useEffect(() => {
    if (!filteredAuctions) {
      setTabState(Auctions.Loading);
    } else if (filteredAuctions.length === 0) {
      setTabState(Auctions.Empty);
    } else {
      setTabState(Auctions.Success);
    }
  }, [filteredAuctions]);

  useInterval(() => {
    const filtered = getActiveAuctions(auctions, states);
    setFilteredAuctions(filtered);
  }, 1000);

  return tabState.cata({
    Loading: () => <DashboardTab.Pane loading />,
    Success: () => <DashboardTab.Pane>{renderedLoans(filteredAuctions, type)}</DashboardTab.Pane>,
    Empty: () => (
      <DashboardTab.Pane>
        <NoResults>No results</NoResults>
      </DashboardTab.Pane>
    )
  });
};

export default Tab;
