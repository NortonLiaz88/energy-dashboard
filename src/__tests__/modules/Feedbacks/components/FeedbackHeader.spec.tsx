import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../../styles/theme';
import { FeedbackHeader } from '../../../../modules/Feedbacks/components/FeedbackHeader';

jest.mock('react-loading-skeleton', () => {
  const MockDiv = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    height,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    count,
  }: {
    height: string;
    count: number;
  }) => <div id="mock-react-loading-skeleton" />;
  return MockDiv;
});

jest.mock('../../../../modules/Feedbacks/components/AverageScore', () => ({
  AverageScore: () => <div id="mock-average-score" />,
}));

jest.mock('../../../../modules/Feedbacks/components/FiveLevels', () => ({
  FiveLevels: () => <div id="mock-five-levels" />,
}));

describe('FeedbackHeader', () => {
  const renderFeedbackHeader = () =>
    render(
      <ThemeProvider theme={theme}>
        <FeedbackHeader />
      </ThemeProvider>,
    );

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render AverageScore and FiveLevels', () => {
    jest.mock('../../../../modules/Feedbacks/hooks/useFeedbacks', () => ({
      useFeedbacks: jest.fn().mockReturnValue({
        isFetching: false,
        isFetched: true,
      }),
    }));
    const { container } = renderFeedbackHeader();
    waitFor(() => {
      expect(container.querySelector('mock-average-score')).toBeTruthy();
      expect(container.querySelector('mock-five-levels')).toBeTruthy();
    });
  });

  it('should render Skeleton', () => {
    jest.mock('../../../../modules/Feedbacks/hooks/useFeedbacks', () => ({
      useFeedbacks: jest.fn().mockReturnValue({
        isFetching: true,
        isFetched: false,
      }),
    }));
    const { container } = renderFeedbackHeader();
    waitFor(() => {
      expect(
        container.querySelector('mock-react-loading-skeleton'),
      ).toBeTruthy();
    });
  });
});
