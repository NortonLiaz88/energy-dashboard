import React from 'react';

import {
  Container,
  ScoreLabelWrapper,
  ScoreLabel,
  LevelWrapper,
  GradientLevel,
} from './styles';

interface Props {
  label: string;
  percentage: number;
}

export const ScoreLevel: React.FC<Props> = ({ percentage, label }) => {
  return (
    <Container>
      <ScoreLabelWrapper>
        <ScoreLabel>{label}</ScoreLabel>
      </ScoreLabelWrapper>
      <LevelWrapper>
        <GradientLevel percentage={percentage} />
      </LevelWrapper>
    </Container>
  );
};
