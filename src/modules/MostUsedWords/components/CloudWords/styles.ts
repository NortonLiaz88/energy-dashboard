import styled from 'styled-components';
import * as am5 from '@amcharts/amcharts5';

export const CloudDiv = styled.div`
  @media (min-width: 0px) {
    width: 100%;
    height: 20rem;
  }
  @media (min-width: 600px) {
    width: 100%;
    height: 30rem;
  }
`;

export const containerStyle = {
  width: am5.percent(100),
  height: am5.percent(100),
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
};

export const wordCloudStyle = {
  randomness: 0.5,
  calculateAggregates: true,
  height: am5.percent(100),
  width: am5.percent(100),
  scale: 1,
};
