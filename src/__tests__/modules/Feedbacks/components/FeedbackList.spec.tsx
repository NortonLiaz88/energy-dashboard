import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StarType } from '../../../../models/Feedback';
import { FeedbackList } from '../../../../modules/Feedbacks/components/FeedbackList';
import theme from '../../../../styles/theme';

jest.mock('date-fns', () => {
  const restOfLibrary = jest.requireActual('date-fns');
  return {
    ...restOfLibrary,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    add(date: Date, { second = 2 }) {
      return date;
    },
  };
});

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

jest.mock('../../../../modules/Feedbacks/components/FeedbackCard', () => ({
  FeedbackCard: () => <div id="mock-feedback-card" />,
}));

jest.mock('../../../../modules/Feedbacks/hooks/useFeedbacks', () => ({
  useFeedbacks: () => ({
    feedbacks: [{}, {}, {}, {}],
    recentsFeedbacks: { current: [{}, {}] },
    isFetching: false,
    isFetched: true,
  }),
}));

jest.mock('../../../../utils/time', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  durationBetween(date: Date, otherDate: Date) {
    return '5 min';
  },
}));

jest.mock('../../../../utils/starRating', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  makeStarRating(score: number): StarType[] {
    return [
      StarType.full,
      StarType.empty,
      StarType.empty,
      StarType.empty,
      StarType.empty,
    ];
  },
}));

describe('FeedbackList', () => {
  const renderFeedbackList = ({ inModal = false }) =>
    render(
      <ThemeProvider theme={theme}>
        <FeedbackList inModal={inModal} />
      </ThemeProvider>,
    );

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render list of feedback list in card', () => {
    jest.mock('../../../../modules/Feedbacks/hooks/useFeedbacks', () => ({
      useFeedbacks: () => ({
        feedbacks: [{}, {}, {}, {}],
        recentsFeedbacks: { current: [{}, {}] },
        isFetching: false,
        isFetched: true,
      }),
    }));
    const { container } = renderFeedbackList({ inModal: false });

    waitFor(() => {
      expect(container.querySelectorAll('mock-feedback-card').length).toEqual(
        2,
      );
    });
  });

  it('should render list of feedback list in modal', () => {
    jest.mock('../../../../modules/Feedbacks/hooks/useFeedbacks', () => ({
      useFeedbacks: () => ({
        feedbacks: [{}, {}, {}, {}],
        recentsFeedbacks: { current: [{}, {}] },
        isFetching: false,
        isFetched: true,
      }),
    }));
    const { container } = renderFeedbackList({ inModal: true });

    waitFor(() => {
      expect(container.querySelectorAll('mock-feedback-card').length).toEqual(
        4,
      );
    });
  });

  it('should render skeleton', () => {
    jest.mock('../../../../modules/Feedbacks/hooks/useFeedbacks', () => ({
      useFeedbacks: () => ({
        feedbacks: [{}, {}, {}, {}],
        recentsFeedbacks: { current: [{}, {}] },
        isFetching: true,
        isFetched: false,
      }),
    }));
    const { container } = renderFeedbackList({ inModal: false });

    waitFor(() => {
      expect(
        container.querySelector('mock-react-loading-skeleton'),
      ).toBeTruthy();
    });
  });
});
