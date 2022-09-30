import { add } from 'date-fns';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { makeStarRating } from '../../../../utils/starRating';
import { durationBetween } from '../../../../utils/time';
import { useFeedbacks } from '../../hooks/useFeedbacks';
import { FeedbackCard } from '../FeedbackCard';

import { Container, FeedbacksWrapper, Title, TitleWrapper } from './styles';

interface Props {
  inModal: boolean;
}

export const FeedbackList: React.FC<Props> = ({ inModal }) => {
  const { feedbacks, recentsFeedbacks, isFetching, isFetched } = useFeedbacks();
  const data = inModal ? feedbacks : recentsFeedbacks.current;
  const endOfService = (startTime: string, duration: number) =>
    add(new Date(startTime), {
      seconds: duration,
    });

  if (isFetching && !isFetched) {
    return (
      <Container>
        <Skeleton height="15rem" count={1} />
        <Skeleton height="8rem" count={5} />
      </Container>
    );
  }

  return (
    <Container>
      <TitleWrapper>
        <Title>Avaliações de usuários</Title>
      </TitleWrapper>
      <FeedbacksWrapper>
        {data.map(feedback => (
          <FeedbackCard
            agentName={feedback.agentName}
            startOfService={new Date(feedback.callStartTime)}
            starRating={makeStarRating(feedback.evaluation)}
            wasSolved={feedback.wasSolved}
            atmModel={feedback.atmModel}
            duringOfService={durationBetween(
              new Date(feedback.callStartTime),
              endOfService(feedback.callStartTime, feedback.callDuration),
            )}
            feedback={feedback.feedback}
            key={`${feedback.callDuration}${feedback.callStartTime}`}
          />
        ))}
      </FeedbacksWrapper>
    </Container>
  );
};
