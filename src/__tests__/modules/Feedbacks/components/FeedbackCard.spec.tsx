import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { FeedbackCard } from '../../../../modules/Feedbacks/components/FeedbackCard';
import { StarType } from '../../../../models/Feedback';
import theme from '../../../../styles/theme';

jest.mock('date-fns', () => {
  const restOfLibrary = jest.requireActual('date-fns');
  return {
    ...restOfLibrary,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    format(date: Date, format: string) {
      return '11/06/2001';
    },
  };
});

jest.doMock('../../../../components/StarRating', () => {
  const MockStarRating = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    starRating,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fullWidth,
  }: {
    starRating: StarType[];
    fullWidth: boolean;
  }) => <div id="mock-star-rating" />;
  return MockStarRating;
});

describe('FeedbackCard', () => {
  const renderFeedbackCard = ({
    wasSolved = true,
    agentName = 'agentName',
    starRating = [] as StarType[],
    startOfService = new Date(),
    atmModel = 'atmModel',
    duringOfService = '5 min',
    feedback = 'Muito bom',
  }) =>
    render(
      <ThemeProvider theme={theme}>
        <FeedbackCard
          agentName={agentName}
          atmModel={atmModel}
          duringOfService={duringOfService}
          feedback={feedback}
          starRating={starRating}
          startOfService={startOfService}
          wasSolved={wasSolved}
        />
      </ThemeProvider>,
    );

  afterEach(cleanup);

  it('should render FeedbackCard', () => {
    const { getByText, container } = renderFeedbackCard({
      agentName: 'Chatbot',
      atmModel: 'ATM 4500',
      duringOfService: '10 min',
      feedback: 'Muito ruim',
      starRating: [
        StarType.full,
        StarType.full,
        StarType.half,
        StarType.empty,
        StarType.empty,
      ],
      startOfService: new Date(),
      wasSolved: false,
    });

    waitFor(() => {
      expect(getByText('Chatbot')).toBeTruthy();
      expect(getByText('ATM 4500')).toBeTruthy();
      expect(getByText('duração: 10 min')).toBeTruthy();
      expect(getByText('Muito ruim')).toBeTruthy();
      expect(getByText('11/06/2001')).toBeTruthy();
      expect(container.querySelector('div-star-rating')).toBeTruthy();
    });
  });
});
