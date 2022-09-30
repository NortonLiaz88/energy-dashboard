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
import { SingleValue } from 'react-select';
import { sub } from 'date-fns';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { AnalyticParams } from '../../../models/Feedback';
import api from '../../../services/api';
import { throwHttpError } from '../../../utils/throwHttpError';
import {
  CallsProps,
  IMonthFilter,
  ProviderProps,
} from '../../Demand/hooks/useDemand';
import { CallsGraph } from '../../ServiceOverview/models/CallsGraph';
import { IChartData, IChartProps } from '../../Demand/components/BarChart';

const ConsumptionCurveContext = createContext({} as CallsProps);

export const ConsumptionCurveProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [callsGraph, setCallsGraph] = useState<IChartProps[]>([]);
  const [monthFilter, setMonthFilter] =
    useState<SingleValue<IMonthFilter>>(null);

  const handleChange = (selectedOption: SingleValue<IMonthFilter>) => {
    setMonthFilter(selectedOption);
  };

  const getChartData = useCallback(
    async ({
      location_code = 'BR',
      period = 'MONTH',
      tz_offset = '+00:00',
      start_at = sub(new Date(), { months: 12 }).toISOString(),
      search,
      end_at,
    }: AnalyticParams): Promise<IChartData[]> => {
      try {
        const params: AnalyticParams = {
          location_code,
          start_at,
          period,
          tz_offset,
          ...(!!end_at && { end_at }),
          ...(!!search && { search }),
        };
        const { data } = await api.get<IChartData[]>(
          '/analytics/calls/resume',
          {
            params,
          },
        );
        return data;
      } catch (err) {
        return throwHttpError(err);
      }
    },
    [],
  );

  const { data, isFetching, isError } = useQuery(
    ['consumption-curve-page', callsGraph, monthFilter],
    // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    () => getChartData({ search: monthFilter?.value! ?? 3 }),
    {
      keepPreviousData: true,
      // refetchInterval: INTERVAL_REFETCH_MS,
    },
  );

  return (
    <ConsumptionCurveContext.Provider
      value={{
        callsGraph: data ?? [],
        handleChange,
        error: isError,
        monthFilter,
      }}
    >
      {children}
    </ConsumptionCurveContext.Provider>
  );
};

export const useCallsGraph = (): CallsProps => {
  const context = useContext(ConsumptionCurveContext);
  return context;
};
