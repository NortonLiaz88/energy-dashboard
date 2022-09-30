import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const keyframeFade = () => keyframes`
  0% {
    opacity: 0;
    transform: translateX(-1rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0rem);
  }
`;

export const ScoreLabelWrapper = styled.div`
  margin-right: 0.4rem;
  height: 1.6rem;
  display: flex;
  animation: ${keyframeFade()} 1s cubic-bezier(0.215, 0.61, 0.355, 1);
`;

export const ScoreLabel = styled.span`
  font-weight: 600;
  font-size: 1.28rem;
  line-height: 1.6rem;
  color: ${props => props.theme.colors.labelLevel};
`;

export const LevelWrapper = styled.div`
  width: 100%;
  height: 2.4rem;
  background-color: ${props => props.theme.colors.dashboardBackground};
  border-radius: 1rem;

  position: relative;
`;

const keyframeSlide = (percentage: number) => keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${percentage}%;
  }
`;

export const GradientLevel = styled.div<{ percentage: number }>`
  background: linear-gradient(
    270deg,
    ${props => props.theme.colors.endGradientColor} -1.42%,
    ${props => props.theme.colors.middleGradientColor} 52.99%,
    ${props => props.theme.colors.initialGradientColor} 100%
  );
  height: 2.4rem;
  box-shadow: 0rem 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  width: ${props => props.percentage}%;
  animation: ${props => keyframeSlide(props.percentage)} 1s
    cubic-bezier(0.215, 0.61, 0.355, 1);
  position: absolute;
  left: 0;
  top: 0;
`;
