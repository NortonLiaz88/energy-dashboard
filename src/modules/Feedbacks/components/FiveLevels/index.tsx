import React from 'react';
import { ScoreLevelProps, TotalPerRating } from '../../../../models/Feedback';
import { useFeedbacks } from '../../hooks/useFeedbacks';
import { ScoreLevel } from '../ScoreLevel';

import { Container } from './styles';

function toPercentage(total: number, amount: number): number {
  try {
    return (amount / total) * 100;
  } catch {
    return 0;
  }
}

function mapRating(
  totalFeedback: number,
  score: TotalPerRating,
): TotalPerRating {
  return {
    '1': toPercentage(totalFeedback, score['1']),
    '2': toPercentage(totalFeedback, score['2']),
    '3': toPercentage(totalFeedback, score['3']),
    '4': toPercentage(totalFeedback, score['4']),
    '5': toPercentage(totalFeedback, score['5']),
  };
}

export const FiveLevels: React.FC = () => {
  const { pagination, scores } = useFeedbacks();
  const ratings = mapRating(
    pagination.totalItem ?? 0,
    scores.current.totalPerRating,
  );
  const scoresLevel: ScoreLevelProps[] = [
    { label: '5', percentage: ratings['5'] },
    { label: '4', percentage: ratings['4'] },
    { label: '3', percentage: ratings['3'] },
    { label: '2', percentage: ratings['2'] },
    { label: '1', percentage: ratings['1'] },
  ];
  return (
    <Container>
      {scoresLevel.map(({ percentage, label }) => (
        <ScoreLevel percentage={percentage} label={label} key={label} />
      ))}
    </Container>
  );
};
