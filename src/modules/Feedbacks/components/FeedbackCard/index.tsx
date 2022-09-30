import React from 'react';
import { format } from 'date-fns';

import { StarType } from '../../../../models/Feedback';

import {
  BetweenWrapper,
  Container,
  Content,
  FeedbackContent,
  IsSolved,
  NameWrapper,
  SideWrapper,
  StarWrapper,
  TextSpan,
} from './styles';
import { StarRating } from '../../../../components/StarRating';

interface Props {
  wasSolved: boolean;
  agentName: string;
  starRating: StarType[];
  startOfService: Date;
  atmModel: string;
  duringOfService: string;
  feedback: string;
}

function makeDate(date: Date): string {
  return format(date, 'dd/MM/yyyy');
}

export const FeedbackCard: React.FC<Props> = ({
  wasSolved,
  agentName,
  starRating,
  startOfService,
  atmModel,
  duringOfService,
  feedback,
}) => {
  return (
    <Container>
      <IsSolved wasSolved={wasSolved} className="is-solved" />
      <Content>
        <BetweenWrapper>
          <SideWrapper>
            <NameWrapper>
              <TextSpan>{agentName}</TextSpan>
            </NameWrapper>
            <StarWrapper>
              <StarRating starRating={starRating} />
            </StarWrapper>
          </SideWrapper>
          <TextSpan>{makeDate(startOfService)}</TextSpan>
        </BetweenWrapper>
        <FeedbackContent>
          <p>{feedback}</p>
        </FeedbackContent>
        <BetweenWrapper>
          <TextSpan>{atmModel}</TextSpan>
          <TextSpan>duração: {duringOfService}</TextSpan>
        </BetweenWrapper>
      </Content>
    </Container>
  );
};
