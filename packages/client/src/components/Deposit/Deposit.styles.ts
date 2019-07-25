import styled from 'styled-components';
import { Card, Grid, Button, Image } from 'semantic-ui-react';
import Web3Address from '../Web3Address';

export const StyledAddress = styled(Web3Address)`
  float: right;
`;

const backgroundImage =
  'https://static.herodev.es/images/pattern-fdesk-dark.svg';

export const ContainerStyled = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em;
  background: #d4e5e8 url(${backgroundImage}) no-repeat fixed bottom/100%;
`;

export const Message = styled.p`
  font-size: 20px;
  color: #767676;
  padding-top: 20px;
`;

export const AutoConfirmStyled = styled.div`
  &&& {
    position: fixed;
    bottom: 200px;
    left: 33px;
  }
`;

export const CardSized = styled(Card)`
  &&& {
    height: 570px;
    width: 512px;
  }
`;
export const GridSized = styled(Grid)`
  &&& {
    height: 100vh;
  }
`;
export const CenteredContainerStyled = styled.div`
  margin-left: auto;
  margin-right: auto;
  height: 570px;
  width: 512px;
`;
export const Title = styled.div`
  color: #104a50;
  font: 40px bold;
  line-height: 48px;
`;

export const Credits = styled.em`
  font-size: 1em;
`;
export const HeaderRow = styled(Grid.Row)`
  &&& {
    margin: 20px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
export const CardCenteredText = styled.div`
  &&& {
    text-align: center;
  }
`;
export const CardTitle = styled.div`
  color: #188e9b;
  font: 26px bold;
  line-height: 36px;
  text-align: center;
  margin: 10px;
`;
export const CardSubtitle = styled.div`
  &&& {
    color: #99a6b6;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    margin: 19px;
  }
`;
export const CardContent = styled(Card.Content)`
  &&& {
    border-top: none !important;
    margin: ${({ bottom_spacing }) =>
      bottom_spacing
        ? '0 2.5em 2.5em 2.5em !important;'
        : '0 2.5em 0em 2.5em !important;'};
  }
`;
export const Amount = styled.p`
  &&& {
    color: #5c5d5d;
    font: 60px bold;
    line-height: 32px;
    text-align: center;
    margin: 0px 105px;
  }

  &&&::before {
    color: #7f8fa4;
    font-size: 12px;
    float: left;
    margin-top: 19px;
    content: 'Amount';
  }
  &&&::after {
    color: #7f8fa4;
    font-size: 12px;
    float: right;
    margin-top: 19px;
    content: 'HeroToken';
  }
`;

export const EquivalencyTitle = styled.p`
  color: #7f8fa4;
  font-size: 12px;
  line-height: 21px;
`;
export const EquivalencyAmount = styled.p`
  color: #5c5d5d;
  font-size: 26px;
  line-height: 36px;
`;
export const EquivalencyExtra = styled.p`
  color: #5c5d5d;
  font-size: 10px;
  line-height: 14px;
`;

export const BlockAmount = styled.div`
  &&& {
    display: block;
    margin: 25px 0px 20px 0px;
  }
`;
export const FooterRow = styled(Grid.Row)`
  &&& {
    padding: 16px 0;
    text-align: center;
  }
`;

export const ButtonGreen = styled(Button)`
  &&&,
  &&&:focus {
    height: 62px;
    width: 100%;
    ${({ blocked }) => (blocked ? 'opacity: 0.4 !important;' : '')}
    background:linear-gradient(134.72deg, #188E9B 0%, #6DD7C7 100%);
    color: white;
    font: 18px bold;
    line-height: 24px;
  }
  &&&:hover {
    background: linear-gradient(134.72deg, #5aafb8 0%, #78d8ca 100%);
    color: white;
    font-weith: bold;
  }
  &&&:active {
    background-color: #188e9b;
    color: white;
    font-weith: bold;
  }
`;

export const ButtonRetry = styled(Button)`
  &&& {
    height: 62px;
    width: 100%;
    background: linear-gradient(0deg, #1991eb 0%, #2da1f8 100%);
    color: white;
    font: 18px bold;
    line-height: 24px;
  }
  &&&:hover {
    background: linear-gradient(0deg, #35a0f0 0%, #43aaf7 100%);
    color: white;
  }
`;

export const ImageSized = styled(Image)`
  &&& {
    height: 268px;
  }
`;
