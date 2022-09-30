import styled, { css } from 'styled-components';

type ContainerProps = {
  inModal?: boolean;
};

export const Container = styled.div<ContainerProps>`
  @media (min-width: 0px) {
    max-width: 250vw;
    ${props =>
      props.inModal &&
      css`
        width: 250vw;
      `};
  }
  @media (min-width: 680px) {
    max-width: 230vw;
    ${props =>
      props.inModal &&
      css`
        width: 230vw;
      `};
  }
  @media (min-width: 980px) {
    max-width: 210vw;
    ${props =>
      props.inModal &&
      css`
        width: 120vw;
      `};
  }
  @media (min-width: 1200px) {
    max-width: 210vw;
    ${props =>
      props.inModal &&
      css`
        width: 120vw;
      `};
  }
  flex: 1;

  overflow: hidden;
`;
