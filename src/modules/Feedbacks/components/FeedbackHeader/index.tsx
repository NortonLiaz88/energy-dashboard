import React from 'react';
import { useFeedbacks } from '../../hooks/useFeedbacks';

import { AverageScore } from '../AverageScore';
import { FiveLevels } from '../FiveLevels';

import { Container } from './styles';

export const FeedbackHeader: React.FC = () => {
  const { isFetching, isFetched } = useFeedbacks();

  if (isFetching && !isFetched) {
    return null;
  }

  return (
    <Container>
      <AverageScore />
      <FiveLevels />
    </Container>
  );
};
