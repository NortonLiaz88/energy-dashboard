import styled, { keyframes } from 'styled-components';

const keyframeFade = () => keyframes`
  0% {
    opacity: 0;
    transform: translateX(-0.4rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0rem);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.6rem;
  animation: ${keyframeFade()} 1s cubic-bezier(0.215, 0.61, 0.355, 1);
`;

export const ScoreWrapper = styled.div`
  width: 100%;
  margin-top: -1.6rem;
  margin-bottom: 0.8rem;
`;

export const ScoreText = styled.span`
  color: ${props => props.theme.colors.link};
  font-size: 10.501rem;
  font-weight: bold;
  line-height: 10.501rem;
`;

export const StarWrapper = styled.div`
  width: 100%;
  height: 2.4rem;
`;

export const EvaluationAmountWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 0.8rem;
  margin-top: 0.301rem;
`;

export const EvaluationAmount = styled.span`
  color: ${props => props.theme.colors.feedbacksAmount};
  line-height: 2rem;
  font-weight: 600;
  font-size: 1.6rem;
`;
