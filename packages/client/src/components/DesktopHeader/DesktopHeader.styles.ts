import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logout from '../Logout';

import { maxDevice } from '../../commons/breakpoints';

export const HeaderWrapper: any = styled.div`
  top: 0;
  position: sticky;
  border-radius: 0px;
  width: 100%;
  z-index: 999;
  margin: 0;
  border: none;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.35);
  background: white;

  @media ${maxDevice.laptop} {
    display: none;
  }

  a {
    color: #3c4251 !important;
  }
`;
interface LogoutButtonInt {
  onSignup?: any;
  onLogin?: any;
}

export const HeaderLogout = styled(Logout)<LogoutButtonInt>`
  &&&& {
    border: 1px solid #3c4251;
    background: transparent;
    height: 42px;
    width: 122px;
    color: #3c4251;
    border-radius: 4px;
    font-size: 18px;
    margin-left: 10px;
    line-height: 24px;
    padding: 0px;
    font-weight: lighter;
    margin-right: 0px !important;
  }
`;

export const HeaderMenu = styled.div`
  display: flex;
`;

export const RaiseHeader = styled.div`
  width: 1172px;
  margin: 0 auto;
  display: flex;
  padding: 20px;
  box-sizing: border-box;

  .right {
    justify-content: flex-end;
  }
`;

export const HeaderGroup = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  &.right > * {
    margin-left: 20px;
  }
`;

export const HeaderLogo = styled.button`
  width: 127px;
  display: flex;
  margin: 0;
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
`;

export const HeaderMenuItem = styled.button`
  margin: 0;
  padding: 0;
  color: #3c4251;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-left: 40px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const LinkContent = styled(Link)`
  margin: 0px 10px;
`;

export const ButtonMyAccount = styled(Button)`
  &&&&&&&& {
    border: 1px solid transparent;
    box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;
    height: 40px;
    color: #b1b3b9 !important;
  }
  &&&&&&&&:hover {
    border: 1px solid #eb3f93;
    box-shadow: 0px 8px 15px rgba(60, 66, 81, 0.25);
    color: #eb3f93;
  }
`;
