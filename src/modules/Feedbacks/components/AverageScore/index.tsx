import React from 'react';

import { numberWithDots } from '../../../../utils/formatNumbers';
import { makeStarRating } from '../../../../utils/starRating';
import { StarRating } from '../../../../components/StarRating';
import { useFeedbacks } from '../../hooks/useFeedbacks';

import {
  Container,
  ScoreText,
  ScoreWrapper,
  EvaluationAmount,
  EvaluationAmountWrapper,
  StarWrapper,
} from './styles';

export const AverageScore: React.FC = () => {
  const { pagination, scores } = useFeedbacks();
  const score = scores.current.averageRating;
  const evaluationAmount = pagination.totalItem;

  const starRating = makeStarRating(score);

  const formatScore = (): string => {
    return score.toFixed(1).replace('.', ',');
  };

  return (
    <Container>
      <ScoreWrapper>
        <ScoreText>{formatScore()}</ScoreText>
      </ScoreWrapper>
      <StarWrapper>
        <StarRating starRating={starRating} fullWidth />
      </StarWrapper>
      <EvaluationAmountWrapper>
        <EvaluationAmount>
          {numberWithDots(evaluationAmount)} avaliações
        </EvaluationAmount>
      </EvaluationAmountWrapper>
    </Container>
  );
};
