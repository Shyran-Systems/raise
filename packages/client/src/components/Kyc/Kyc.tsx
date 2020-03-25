import React, { useState, useEffect } from 'react';
import { Button, Image } from 'semantic-ui-react';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import {
  KYCWrapper,
  OnGoBackButton,
  GetStartedSumTitle,
  GetStartedSumSubtitle,
  GetStartedSumDescription
} from './Kyc.styles';
import { useRootContext } from '../../contexts/RootContext';
import useRouter from '../../hooks/useRouter';
import useInterval from '../../hooks/useInterval';
import LocalData from '../../helpers/localData';
import { getUser } from '../../services/auth';

const KYC = () => {
  const {
    store,
    store: {
      kyc: { token }
    },
    actions: {
      kyc: { onConnect }
    }
  }: any = useRootContext();
  const { history }: any = useRouter();
  const [userObj, setUserObj] = useState<any>(null);

  useEffect(() => {
    setUserObj(LocalData.getObj('user'));
  }, []);

  useAsyncEffect(async () => {
    if (history.location.pathname === '/kyc-sumsub' && token) {
      const { id } = store.user.details;

      await onConnect();
      // @ts-ignore
      window.idensic.init(
        '#idensic',
        {
          clientId: process.env.REACT_APP_SUMSUB_CLIENTID,
          externalUserId: id,
          accessToken: token,
          excludedCountries: [
            'IRN',
            'IRQ',
            'COD',
            'BIH',
            'SDN',
            'SYR',
            'ZWE',
            'LBR',
            'ALB',
            'MKD',
            'XKX',
            'SRB',
            'MNE',
            'BLR',
            'MMR',
            'CIV',
            'CUB',
            'USA',
            'UMI',
            'SSD',
            'PRK'
          ]
        },
        (messageType, payload) =>
          console.log('[IDENSIC DEMO] Idensic message:', messageType, payload)
      );
    }
  }, [history, token]);

  useInterval(async () => {
    if (userObj) {
      const { id } = userObj;

      const user = await getUser(id);
      if (user.kyc_status === 1 && user.kyc_provider === 2) {
        LocalData.setObj('user', {
          ...user
        });
      }
      if (user.kyc_status === 4 || user.kyc_status === 3) {
        history.push('/kyc-success');
        LocalData.setObj('user', {
          ...user
        });
      }
    }
  }, 3000);

  return (
    <KYCWrapper>
      <GetStartedSumTitle as="h2">Verify your account</GetStartedSumTitle>
      <GetStartedSumSubtitle>
        <span>with</span>
        <Image
          src={`${process.env.REACT_APP_HOST_IMAGES}/images/sumsub_logo_417x76.png`}
          size="small"
        />
      </GetStartedSumSubtitle>
      <GetStartedSumDescription>
        <span>
          This process will take approximately 3 minutes to complete and it will be verified by a
          third-party organization. After submission, you will receive an email confirming your
          approval or to verify further information. The time-frame for approval can vary on a user
          to user basis.
        </span>
      </GetStartedSumDescription>
      <div id="idensic" />
      <OnGoBackButton>
        <Button basic color="black" onClick={() => history.push('/kyc')}>
          Go back
        </Button>
      </OnGoBackButton>
    </KYCWrapper>
  );
};

export default KYC;
