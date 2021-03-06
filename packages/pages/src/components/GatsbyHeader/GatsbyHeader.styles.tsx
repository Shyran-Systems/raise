import styled from 'styled-components';

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  signUp: '860px',
  desktop: '950px'
};

export const FlexDiv = styled.div`
  width: 344px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 14px;
`;

export const MobileLinkWrapper = styled.div`
  display: none;
  @media (max-width: ${size.mobileL}) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-right: 10px;
    width: 130px;
  }
`;

export const ButtonWrapper = styled.div`
  display: none;
  @media (min-width: ${size.mobileL}) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    width: 260px;
  }
`;

export const LinkContainer = styled.div`
  & > a {
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    display: block;
    width: auto;
    color: #8a8e97;
    padding: 15px;
    text-align: center;
    white-space: nowrap;
    background-color: #fff;
    border: none;
    cursor: pointer;
  }
`;
