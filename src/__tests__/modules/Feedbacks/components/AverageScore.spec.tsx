import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { AverageScore } from '../../../../modules/Feedbacks/components/AverageScore';
import theme from '../../../../styles/theme';
import { StarType } from '../../../../models/Feedback';

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

jest.mock('../../../../modules/Feedbacks/hooks/useFeedbacks', () => ({
  useFeedbacks: () => ({
    pagination: {
      totalItem: 10,
    },
    scores: { current: { averageRating: 4.333 } },
  }),
}));

describe('AverageScore', () => {
  const renderAverageScore = () =>
    render(
      <ThemeProvider theme={theme}>
        <AverageScore />
      </ThemeProvider>,
    );

  afterEach(cleanup);

  it('should render Score', () => {
    const { getByText } = renderAverageScore();

    waitFor(() => {
      expect(getByText('4.3')).toBeTruthy();
    });
  });

  // it('should render StarRating', () => {
  //   const { container } = renderAverageScore();

  //   waitFor(() => {
  //     const divStarRating = container.querySelector('#mock-star-rating');
  //     expect(divStarRating).toBeTruthy();
  //   });
  // });

  // it('should render EvaluationAmount', () => {
  //   const { getByText } = renderAverageScore();

  //   waitFor(() => {
  //     expect(getByText('10 avaliações')).toBeTruthy();
  //   });
  // });
});
