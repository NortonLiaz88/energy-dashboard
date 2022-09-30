import { CgExpand } from 'react-icons/cg';
import styled from 'styled-components';

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.shape};
  padding: 1.2rem;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 0.5rem;
  width: 100%;

  margin-bottom: 1rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.125rem;
`;

export const Title = styled.h3`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1rem;
  margin-right: 1rem;

  /* Azul primário */

  padding: 1.5rem;

  color: ${({ theme }) => theme.colors.link};
`;

export const ExpandIcon = styled(CgExpand).attrs({
  size: '2.5rem',
})`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.link};
`;

export const FadeCard = styled.div`
  background: linear-gradient(
    360deg,
    ${props => props.theme.colors.shape} 40.27%,
    rgba(255, 255, 255, 0) 84.96%
  );
  z-index: 1;
  width: 100%;
  height: 20rem;
  margin-top: 20rem;
`;
