export type Steps =
  | 'Start'
  | 'SignIn'
  | 'SignInWithEmail'
  | 'Confirm'
  | 'Verified'
  | 'ResetOK'
  | 'ResetKO'
  | 'SignUpWithEmail'
  | 'SignUpWithBloom'
  | 'SignInWithBloom';

export interface ICredentials {
  email: string;
  password: string;
  username: string;
  country_id: string;
  mailingChecked: boolean;
  'g-recaptcha-response': string;
}

export interface ISignup {
  username: string;
  email: string;
  password: string;
  country_id: string;
  referrer_code?: any;
  mailingChecked: boolean;
  'g-recaptcha-response': string;
}

export interface ISignin {
  email: string;
  password: string;
  'g-recaptcha-response': string;
}

export interface ILoginWithBloom {
  public_key: string;
  id: string;
  userstatus_id: string;
  accounttype_id: string;
}

export interface IContext {
  credentials: ICredentials;
  onSetStep: (step: Steps) => () => null | void | Promise<any>;
  onSetStepWithParam: (step: string) => (param: string) => () => null | void | Promise<any>;
  onSetCredentials: (input: string, value: string | boolean) => null | void | Promise<any>;
  onSendCredentials: () => null | void | Promise<any>;
  onResetPassword: (token: string, password: string) => null | void | Promise<any>;
  onSetPasswordBorrower: (token: string, password: string) => null | void | Promise<any>;
  onActivateAccount: (token: string) => null | void | Promise<any>;
  onLoginWithBloom: (result: ILoginWithBloom, method: string) => null | void | Promise<any>;
  onLogin: () => null | void | Promise<any>;
  setLoginError: (x: boolean) => null | void | Promise<any>;
  error: boolean;
  referralCode: string | null;
  onRecover: (email: string) => null | void | Promise<any>;
  onClose?: () => null | void;
  onResetToken: () => null | void | Promise<any>;
  history: any;
}
