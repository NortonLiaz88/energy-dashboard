/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable camelcase */
import React, { createContext, useContext } from 'react';
import { sub } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

import {
  MostUsedWordsParams,
  MostUsedWordsResponse,
} from '../../../models/MostUsedWords';
import api from '../../../services/api';
import { throwHttpError } from '../../../utils/throwHttpError';
import { INTERVAL_REFETCH_MS } from '../../../constants/constantsFeedback';

interface Props {
  wordsSeries: MostUsedWordsResponse[];
  isFetching: boolean;
  isFetched: boolean;
  error: boolean;
}

const MostUsedWordsContext = createContext({} as Props);

export const MostUsedWordsProvider: React.FC = ({ children }) => {
  const getMessagesResume = async ({
    location_code = 'BR',
    start_at = sub(new Date(), { months: 2 }).toISOString(),
    end_at,
    search,
  }: MostUsedWordsParams): Promise<MostUsedWordsResponse[]> => {
    try {
      const params: MostUsedWordsParams = {
        location_code,
        start_at,
        ...(!!end_at && { end_at }),
        ...(!!search && { search }),
      };
      const { data } = await api.get<MostUsedWordsResponse[]>(
        '/analytics/messages/resume',
        {
          params,
        },
      );
      return data;
    } catch (err) {
      return throwHttpError(err);
    }
  };

  const { data, isFetching, isFetched, isError } = useQuery(
    ['most-used-words'],
    () => getMessagesResume({}),
    {
      keepPreviousData: true,
      refetchInterval: INTERVAL_REFETCH_MS,
    },
  );

  return (
    <MostUsedWordsContext.Provider
      value={{
        isFetched,
        isFetching,
        wordsSeries: data ?? [],
        error: isError,
      }}
    >
      {children}
    </MostUsedWordsContext.Provider>
  );
};

export const useMostUsedWords = (): Props => {
  const context = useContext(MostUsedWordsContext);
  return context;
};
