import styled from 'styled-components';

const DisplayFlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled(DisplayFlexCenter)`
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

export const ResolvedCalls = styled(DisplayFlexCenter)`
  &::before {
    content: '';
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.success};
    margin-right: 0.8rem;
  }

  span {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: ${props => props.theme.colors.success};
  }

  margin-right: 1.6rem;
`;

export const UnresolvedCalls = styled(DisplayFlexCenter)`
  &::before {
    content: '';
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.attentionSecondary};
    margin-right: 0.8rem;
  }

  span {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: ${props => props.theme.colors.attentionSecondary};
  }
`;
