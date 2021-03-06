import React, { useMemo, lazy, Suspense } from 'react';
import { match, ANY } from 'pampy';
import { Link } from 'react-router-dom';
import { Card } from '@raisehq/components';
import Amount from '../Dashboard/Dashboard.Amount';
import useBorrowerInfo from '../../hooks/useBorrowerInfo';
import { loanStatus, loanStatusColors } from '../../commons/loanStatus';
import { GetInTouch } from '../GetInTouch';
import useGetCoin from '../../hooks/useGetCoin';

const ClaimRepay = lazy(() => import('../ClaimRepay'));
const ClaimRefund = lazy(() => import('../ClaimRefundInvestor/ClaimRefund.Button'));

const LenderACU = ({ auction, calcs }: { auction: any; calcs: any }) => {
  const { companyName, route } = useBorrowerInfo(auction.originator);
  const { roi, times, maxAmount, lenderRoiAmount, lenderAmount } = calcs;
  const coin = useGetCoin(auction);

  const cta = useMemo(() => {
    const conditions = [auction.state, auction.withdrawn];
    return match(
      conditions,
      [4, false],
      () => <ClaimRepay loan={auction} />,
      [3, ANY],
      () => <GetInTouch />,
      [1, false],
      () => <ClaimRefund loan={auction} />,
      [6, false],
      () => <ClaimRefund loan={auction} />,
      ANY,
      () => null
    );
  }, [auction.state, auction.withdrawn]);

  const state = useMemo(() => {
    if (auction.loanRepaid) {
      return 5;
    }
    return auction.state;
  }, [auction.state, auction.loanRepaid]);

  const contentColor = state === 3 ? 'red' : null;
  const loanTermLeft = state === 5 ? '-' : times.loanTermLeft;

  return (
    <Card width="372px">
      <Card.Content size="100%">
        <Card.Grid>
          <Link to={route}>
            <Card.BorrowerTitle>{companyName}</Card.BorrowerTitle>
          </Link>
          <Card.Badge color={loanStatusColors[state]}>{loanStatus[state]}</Card.Badge>
        </Card.Grid>
        <Card.Grid spaceBetween notop>
          <Card.Header
            title="Investment return"
            amount={<Amount principal={lenderRoiAmount} coin={coin} />}
          />
          <Card.RoiHeader roi={roi} />
        </Card.Grid>
        <Card.Separator />
        <Card.Grid>
          <Card.Row notop title="Amount invested" content={lenderAmount} />
          <Card.Row notop title="Loan amount" content={maxAmount} />
        </Card.Grid>
        <Card.Grid>
          <Card.Row
            notop
            title="Time left"
            content={loanTermLeft || '-'}
            contentColor={contentColor}
          />
          <Card.Row notop title="Loan Term" content={times.loanTerm} />
          <Card.Row notop title="Investors" content={auction.investorCount} />
        </Card.Grid>
        <Suspense fallback={<div>Loading...</div>}>{cta}</Suspense>
      </Card.Content>
    </Card>
  );
};

export default LenderACU;
