import styled from 'styled-components';

export const SeeMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    360deg,
    ${props => props.theme.colors.shape} 40.27%,
    rgba(255, 255, 255, 0) 84.96%
  );

  flex-direction: column;
  transition: transform 0.4s;
  z-index: 2;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: transform 0.4s;
    transform: translateY(-0.8rem);
  }
`;

export const VerticalSizedBox = styled.div`
  margin-top: 10rem;
`;
