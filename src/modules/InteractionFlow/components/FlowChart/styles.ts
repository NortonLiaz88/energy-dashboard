import styled from 'styled-components';
import * as am5 from '@amcharts/amcharts5';

interface ContainerProps {
  inModal?: boolean;
}

export const Container = styled.div<ContainerProps>`
  @media (min-width: 0px) {
    width: 100%;
    height: ${({ inModal }) => (inModal ? 40 : 30)}vh;
  }
  @media (min-width: 680.01px) {
    width: 100%;
    height: ${({ inModal }) => (inModal ? 50 : 30)}vh;
  }
`;

export const containerStyle = {
  width: am5.percent(100),
  height: am5.percent(100),
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 200,
  paddingTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
};

export const flowChartStyle = {
  sourceIdField: 'from',
  targetIdField: 'to',
  valueField: 'value',
  calculateAggregates: true,
  height: am5.percent(100),
  width: am5.percent(100),
  minSize: 0.03,
  scale: 1,
};
