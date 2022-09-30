import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.dashboardBackground};
  border-radius: 0.8rem;
  display: flex;
  box-sizing: border-box;
  border-radius: 0.8rem;

  margin-bottom: 1.6rem;
  box-shadow: 0rem 0.4rem 0.4rem rgba(0, 0, 0, 0.25);

  transition: transform 0.3s;

  &:hover {
    transform: translateY(-0.2rem);
  }
`;

export const IsSolved = styled.div<{ wasSolved: boolean }>`
  height: 13.2rem;
  width: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  border-top-left-radius: 0.8rem;

  background-color: ${props =>
    props.wasSolved
      ? props.theme.colors.success
      : props.theme.colors.attentionSecondary};
`;

export const Content = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.dashboardBackground};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.2rem;
  border-radius: 0.8rem;
`;

export const BetweenWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const SideWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const NameWrapper = styled.div`
  margin-right: 0.8rem;
  height: 1.8rem;
`;

export const StarWrapper = styled.div`
  height: 1.8rem;
`;

export const TextSpan = styled.span`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 1.8rem;

  color: ${props => props.theme.colors.feedbacksAmount};
`;

export const FeedbackContent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  margin-top: 1.6rem;
  max-height: 3.6rem;
  margin-bottom: 1.6rem;
  overflow: hidden;

  p {
    font-weight: 400;
    word-wrap: break-word;
    text-overflow: ellipsis;
    font-size: 1.6rem;
    line-height: 1.8rem;
    color: ${props => props.theme.colors.seeMoreBox};
  }
`;
