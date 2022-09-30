import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  width: 100%;

  position: relative;
  overflow: hidden;
`;

export const MoreContentWrapper = styled.div`
  width: 120%;
  height: 11.2rem;
  transform: translateY(0);
  background: linear-gradient(
    360deg,
    ${props => props.theme.colors.shape} 40.27%,
    transparent 84.96%
  );

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

export const MoreContent = styled.div`
  background: ${props => props.theme.colors.seeMoreBox};
  border-radius: 0.8rem;
  padding: 1.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.4s;

  span {
    font-weight: 600;
    font-size: 2rem;
    line-height: 2.4rem;
    color: ${props => props.theme.colors.shape};
    margin-right: 3.2rem;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: transform 0.4s;
    transform: translateY(-0.8rem);
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
