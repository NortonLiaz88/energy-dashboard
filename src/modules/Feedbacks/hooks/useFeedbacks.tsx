/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable camelcase */
import { useQuery } from '@tanstack/react-query';
import { sub } from 'date-fns';
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {
  defaultCalls,
  defaultMetaPagination,
  defaultPagination,
  defaultScore,
  INTERVAL_REFETCH_MS,
} from '../../../constants/constantsFeedback';
import {
  FeedbackProps,
  AnalyticParams,
  FeedbacksResponse,
  MetaPagination,
  TotalPerRating,
} from '../../../models/Feedback';
import api from '../../../services/api';
import { throwHttpError } from '../../../utils/throwHttpError';

interface Props {
  feedbacks: FeedbackProps[];
  recentsFeedbacks: React.MutableRefObject<FeedbackProps[]>;
  calls: React.MutableRefObject<{
    totalResolved: number;
    totalUnresolved: number;
  }>;
  pagination: {
    firstItem: number;
    lastItem: number;
    page: number;
    pageSize: number;
    totalItem: number;
    totalPages: number;
  };
  scores: React.MutableRefObject<{
    averageRating: number;
    totalPerRating: TotalPerRating;
  }>;
  isFetching: boolean;
  isFetched: boolean;
  error: boolean;
  handlePreviousPage: () => void;
  handleForwardPage: () => void;
}

const FeedbacksContext = createContext({} as Props);

export const FeedbacksProvider: React.FC = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const recentsFeedbacks = useRef([] as FeedbackProps[]);
  const paginationRef = useRef(defaultPagination);
  const calls = useRef(defaultCalls);
  const scores = useRef(defaultScore);

  const canForward = useCallback(() => {
    return paginationRef.current.totalPages > paginationRef.current.page + 1;
  }, []);

  const getFeedbacks = async ({
    page = 0,
    location_code = 'BR',
    page_size = 10,
    start_at = sub(new Date(), { months: 12 }).toISOString(),
    search,
    end_at,
  }: AnalyticParams): Promise<FeedbacksResponse> => {
    try {
      const params: AnalyticParams = {
        page,
        location_code,
        page_size,
        search,
        start_at,
        ...(!!end_at && { end_at }),
        ...(!!search && { search }),
      };
      const { data } = await api.get<FeedbacksResponse>(
        '/analytics/feedbacks',
        {
          params,
        },
      );
      return data;
    } catch (err) {
      return throwHttpError(err);
    }
  };

  const setScore = ({ averageRating, totalPerRating }: FeedbacksResponse) => {
    scores.current = {
      averageRating,
      totalPerRating: { ...totalPerRating },
    };
  };

  const setCalls = ({ totalResolved, totalUnresolved }: FeedbacksResponse) => {
    calls.current = {
      totalResolved,
      totalUnresolved,
    };
  };

  const firstItemPagination = ({
    page,
    pageSize,
  }: MetaPagination = defaultMetaPagination): number => {
    return page * pageSize + 1;
  };

  const lastItemPagination = (
    { page, pageSize, totalPages }: MetaPagination = defaultMetaPagination,
    totalItems = 0,
  ): number => {
    if (page + 1 === totalPages) {
      return totalItems;
    }
    return (page + 1) * pageSize;
  };

  const setPagination = useCallback(({ meta, total }: FeedbacksResponse) => {
    paginationRef.current = {
      firstItem: firstItemPagination(meta),
      lastItem: lastItemPagination(meta, total),
      page: meta.page,
      pageSize: meta.pageSize,
      totalItem: total,
      totalPages: meta.totalPages,
    };
  }, []);

  const setRecentsFeedbacks = ({ feedbacks, meta }: FeedbacksResponse) => {
    if (meta.page === 0) {
      recentsFeedbacks.current = feedbacks.slice(0, 5);
    }
  };

  const handleFeedbacks = useCallback(
    async (feedbackResponse: FeedbacksResponse) => {
      setScore(feedbackResponse);
      setCalls(feedbackResponse);
      setPagination(feedbackResponse);
      setRecentsFeedbacks(feedbackResponse);
    },
    [setPagination],
  );

  const handlePreviousPage = useCallback(() => {
    setCurrentPage(oldPage => Math.max(oldPage - 1, 0));
  }, []);

  const handleForwardPage = useCallback(() => {
    if (canForward()) {
      setCurrentPage(oldPage => oldPage + 1);
    }
  }, [canForward]);

  const { data, isFetching, isFetched, isError } = useQuery(
    ['feedbacks-page', currentPage],
    () => getFeedbacks({ page: currentPage }),
    {
      keepPreviousData: true,
      refetchInterval: INTERVAL_REFETCH_MS,
      onSuccess(data) {
        handleFeedbacks(data);
      },
    },
  );

  const pagination = {
    firstItem: firstItemPagination(data?.meta),
    lastItem: lastItemPagination(data?.meta, data?.total),
    page: data?.meta.page ?? 0,
    pageSize: data?.meta.pageSize ?? 0,
    totalItem: data?.total ?? 0,
    totalPages: data?.meta.totalPages ?? 0,
  };

  return (
    <FeedbacksContext.Provider
      value={{
        feedbacks: data?.feedbacks ?? [],
        calls,
        pagination,
        scores,
        handleForwardPage,
        handlePreviousPage,
        recentsFeedbacks,
        isFetching,
        isFetched,
        error: isError,
      }}
    >
      {children}
    </FeedbacksContext.Provider>
  );
};

export const useFeedbacks = (): Props => {
  const context = useContext(FeedbacksContext);
  return context;
};
