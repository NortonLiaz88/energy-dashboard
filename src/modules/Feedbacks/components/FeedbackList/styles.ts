import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  position: relative;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.6rem;
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.4rem;

  color: ${props => props.theme.colors.description};
`;

export const FeedbacksWrapper = styled.div`
  width: 100%;
  max-height: 100%;
`;
