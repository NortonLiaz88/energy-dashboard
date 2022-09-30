import styled from 'styled-components';

interface ContainerProps {
  inModal?: boolean;
}

export const Container = styled.div<ContainerProps>`
  @media (min-width: 0px) {
    max-width: 80vw;
  }
  @media (min-width: 340px) {
    max-width: ${props => (props.inModal ? 100 : 90)}vw;
  }
  @media (min-width: 680.01px) {
    max-width: ${props => (props.inModal ? 80 : 50)}vw;
  }

  flex: 1;

  overflow: hidden;
`;
