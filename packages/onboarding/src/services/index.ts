import axios from 'axios';
import { isMobile } from 'react-device-detect';
import { getHost, to, Left, Right, Either } from '../utils/index';

const COMMON_HEADERS = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const URL = {
  REGISTER: `${getHost('CORE')}/users/register`,
  RECOVERY: `${getHost('AUTH')}/users/password/reset`,
  CHANGE_PASSWORD: `${getHost('AUTH')}/users/password/change`,
  AUTHENTICATE: `${getHost('AUTH')}/jwt/authenticate`,
  EMAIL: `${getHost('CORE')}/users/email/token/validate/:id`,
  CREATE_EMAIL: `${getHost('CORE')}/users/email/token/send/:id`,
  USER: `${getHost('CORE')}/users`,
  REFRESH: `${getHost('AUTH')}/jwt/refresh`,
  CHECK_USERNAME: `${getHost('AUTH')}/users/username/exists?username=`,
  CHECK_EMAIL: `${getHost('AUTH')}/users/email/exists`,
  CHECK_COUNTRYBLOCKED: `${getHost('AUTH')}/users/country/blocked?country_id=`,
  BLOOM_SIGN_IN: `${getHost('CORE')}/kyc/scan`,
  BLOOM_LOGIN: `${getHost('AUTH')}/oauth/bloom/authenticate`,
  REDIRECT: `${getHost('APP')}/login/bloom/:token`
};

export const signUp = async (data) => {
  const config: any = {
    url: URL.REGISTER,
    method: 'POST',
    ...COMMON_HEADERS,
    data
  };

  const response = await to(axios(config));
  return response;
};

export const signIn = async (data) => {
  const config: any = {
    url: URL.AUTHENTICATE,
    method: 'POST',
    ...COMMON_HEADERS,
    data
  };

  const response = await to(axios(config));
  return response;
};

export const recovery = async (email) => {
  const config: any = {
    url: `${URL.RECOVERY}/${email}`,
    method: 'GET',
    ...COMMON_HEADERS
  };

  const response = await to(axios(config));
  return response;
};

export const changePassword = async (token, password) => {
  const config: any = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = await to(axios.put(`${URL.CHANGE_PASSWORD}`, { token, password }, config));
  return response;
};

export const validateToken = async ({ token }) => {
  const config: any = {
    url: URL.EMAIL.replace(':id', token),
    method: 'GET',
    ...COMMON_HEADERS
  };

  const response = await to(axios(config));
  return response;
};
export const updateToken = async (token) => {
  const config: any = {
    url: URL.CREATE_EMAIL.replace(':id', token),
    method: 'GET',
    ...COMMON_HEADERS
  };

  const response = await to(axios(config));
  return response;
};

export const checkUsername = async (username) => {
  const config: any = {
    url: `${URL.CHECK_USERNAME}${username}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const request = await to(axios(config));

  return request.fold(
    () => Left(null),
    (resp) => Either.either(resp.data.exist === 0)
  );
};

export const checkEmail = async (email) => {
  const config: any = {
    url: `${URL.CHECK_EMAIL}/${email}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const request = await to(axios(config));

  return request.fold(
    () => Right('Not Exist'),
    () => Left('Exist')
  );
};

export const checkBlockedCountry = async (countryid) => {
  const config: any = {
    url: `${URL.CHECK_COUNTRYBLOCKED}${countryid}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const request = await to(axios(config));

  return request.fold(
    () => Left(null),
    (resp) => Either.either(resp.data.exist === 0)
  );
};

export const bloomSignIn = () => URL.BLOOM_SIGN_IN;

const checkDappBrowserCallback = (token) => {
  // @ts-ignore
  if (window.web3 && window.web3.currentProvider.isMetaMask) {
    return `https://metamask.app.link/dapp/raise.it/login/bloom/${token}`;
  }
  // @ts-ignore
  if (window.web3 && window.web3.currentProvider.isTrust) {
    return `https://link.trustwallet.com/open_url?coin_id=60&url=https://raise.it/login/bloom/${token}`;
  }
  // @ts-ignore
  if (window.web3 && window.web3.currentProvider.isStatus) {
    return `status-im://browse/raise.it//login/bloom/${token}`;
  }
  return URL.REDIRECT.replace(':token', token);
};

export const redirectFromBloomApp = (token) => {
  if (isMobile) {
    return checkDappBrowserCallback(token);
  }
  return URL.REDIRECT.replace(':token', token);
};

export const verifyBloomLogin = async (tokenBloom) => {
  const config: any = {
    url: `${URL.BLOOM_LOGIN}`,
    method: 'POST',
    ...COMMON_HEADERS,
    data: { bloom_id: tokenBloom }
  };

  const resp = await to(axios(config));
  return resp;
};
