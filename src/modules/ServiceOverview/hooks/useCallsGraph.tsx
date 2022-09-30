/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable camelcase */
/* eslint-disable-next-line no-param-reassign */

import { useQuery } from '@tanstack/react-query';
import { sub } from 'date-fns';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { INTERVAL_REFETCH_MS } from '../../../constants/constantsFeedback';
import { AnalyticParams } from '../../../models/Feedback';
import api from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';
import { throwHttpError } from '../../../utils/throwHttpError';

import { Call, CallsAnalyctsResponse } from '../models/CallsAnalytics';
import { CallsGraph } from '../models/CallsGraph';

export type OrderBy =
  | 'user'
  | 'atm'
  | 'bank'
  | 'data'
  | 'duration'
  | 'avalitation'
  | '';

export type OrderItem = {
  name: OrderBy;
  status: 'positive' | 'negative';
};

export interface LoadProps {
  orderBy?: string;
}

interface CallsProviderProviderProps {
  children: ReactNode;
}

interface CallsProps {
  callsGraph: CallsGraph[];
  handleFilterGraph: (value: string) => void;
  error: boolean;
}

const CallsGraphContext = createContext({} as CallsProps);

export const CallsGraphProvider: React.FC<CallsProviderProviderProps> = ({
  children,
}) => {
  const [callsGraph, setCallsGraph] = useState<CallsGraph[]>([]);
  const [inputFilter, setInputFilter] = useState('');

  const filterBar = useCallback((value: string) => {
    setInputFilter(value);
  }, []);

  const getChartData = useCallback(
    async ({
      location_code = 'BR',
      period = 'MONTH',
      tz_offset = '+00:00',
      start_at = sub(new Date(), { months: 12 }).toISOString(),
      search,
      end_at,
    }: AnalyticParams): Promise<CallsGraph[]> => {
      try {
        const params: AnalyticParams = {
          location_code,
          start_at,
          period,
          tz_offset,
          ...(!!end_at && { end_at }),
          ...(!!search && { search }),
        };
        const { data } = await api.get<CallsGraph[]>(
          '/analytics/calls/resume',
          {
            params,
          },
        );
        data.map(ele => (ele.date = new Date(ele.year, ele.month, ele.day)));
        return data;
      } catch (err) {
        return throwHttpError(err);
      }
    },
    [],
  );

  const { data, isFetching, isError } = useQuery(
    ['calls-page', callsGraph, inputFilter],
    () => getChartData({ search: inputFilter ?? '' }),
    {
      keepPreviousData: true,
      refetchInterval: INTERVAL_REFETCH_MS,
    },
  );

  return (
    <CallsGraphContext.Provider
      value={{
        callsGraph: data ?? [],
        handleFilterGraph: filterBar,
        error: isError,
      }}
    >
      {children}
    </CallsGraphContext.Provider>
  );
};

export const useCallsGraph = (): CallsProps => {
  const context = useContext(CallsGraphContext);
  return context;
};
