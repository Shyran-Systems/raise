import React, { useState, useEffect } from 'react';
import { fromWei } from 'web3-utils';
import { List, Grid } from 'semantic-ui-react';
import { UI, getViewResponse } from './Referral.Response';
import useReferralContract from '../../hooks/useReferralContract';
import { useAppContext } from '../../contexts/AppContext';
import { useRootContext } from '../../contexts/RootContext';
import {
  ButtonGreen,
  MessageCoin,
  RewardMessage,
  ContainerListFriends,
  FriendsListItem,
  RewardAmount,
  Separator,
  ResumeContainer,
  RewardMessageSubTitle,
  RewardMessageFriends
} from './Referral.styles';

const getView = (friends: any[]) => {
  if (friends.length === 0) {
    return <RewardMessageSubTitle>Invite friends and start earning</RewardMessageSubTitle>;
  }
  return (
    // TODO : This function need to be refactored
    // prettier-ignore
    <List>
      {friends.map((friend) => (
        <FriendsListItem key={friend.name}>
          <List.Icon name="check" color="green" />
          <List.Content>
            {// eslint-disable-next-line
            friend.name
              ? friend.name.length > 14
                ? `${friend.name.substring(0, 11)}...`
                : friend.name
              : `${friend.address.substring(0, 6)}...${friend.address.substring(
                  friend.address.length - 4 // eslint-disable-line
                )  // eslint-disable-line 
              }`}
          </List.Content>
        </FriendsListItem>
      ))}
    </List>
  );
};

const Resume = () => {
  const ReferralContract = useReferralContract();
  const [status, setStatus] = useState(UI.None);

  const {
    store: {
      blockchain: { referrals, totalBountyToWithdraw: balance }
    },
    actions: {
      blockchain: { fetchReferrals }
    }
  }: any = useRootContext();
  const {
    web3Status: { account, network }
  }: any = useAppContext();

  const onWithdraw = async () => {
    setStatus(UI.Waiting);
    try {
      await ReferralContract.withdraw(account);
      setStatus(UI.Success);
    } catch (error) {
      setStatus(UI.Error);
    }
  };

  useEffect(() => network && status === UI.Success && fetchReferrals(network), [
    status,
    network,
    fetchReferrals
  ]);
  const balanceWei = fromWei(balance.toString(), 'ether');
  return (
    <ResumeContainer>
      <Grid.Row>
        <Grid.Column>
          <RewardMessage>
            You have earned:
            <RewardAmount>{balanceWei}</RewardAmount>
            <MessageCoin> RAISE</MessageCoin>
          </RewardMessage>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Separator />
        </Grid.Column>
      </Grid.Row>
      <ContainerListFriends>
        <Grid.Column>
          <RewardMessageFriends>Referred friends</RewardMessageFriends>
          {getView(referrals || [])}
        </Grid.Column>
      </ContainerListFriends>
      <Grid.Row>
        <Grid.Column>
          <ButtonGreen onClick={onWithdraw} disabled={!(Number(balanceWei) > 0)}>
            {Number(balanceWei) > 0 ? `Claim ${balanceWei} Tokens` : 'Claim'}
          </ButtonGreen>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>{getViewResponse(status)}</Grid.Column>
      </Grid.Row>
    </ResumeContainer>
  );
};

export default Resume;
