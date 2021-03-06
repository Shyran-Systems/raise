import auth from './auth';
import kyc from './kyc';
import blockchain from './blockchain';
import user from './user';
import config from './config';
import loan from './loan';
import dai from './dai';
import onboarding from './onboarding';
import loanDispatcher from './loanDispatcher';

export default (dispatch, state) => ({
  config: config(dispatch),
  auth: auth(dispatch, state),
  user: user(dispatch, state),
  kyc: kyc(dispatch, state),
  blockchain: blockchain(dispatch, state),
  loan: loan(dispatch, state),
  dai: dai(dispatch),
  onboarding: onboarding(dispatch),
  loanDispatcher: loanDispatcher(dispatch)
});
