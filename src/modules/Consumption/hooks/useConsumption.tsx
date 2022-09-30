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
import React, { createContext, useCallback, useContext, useState } from 'react';
import { AnalyticParams } from '../../../models/Feedback';
import api from '../../../services/api';
import { throwHttpError } from '../../../utils/throwHttpError';
import {
  CallsProps,
  IMonthFilter,
  ProviderProps,
} from '../../Demand/hooks/useDemand';
import { IChartData, IChartProps } from '../../Demand/components/BarChart';

const ConsumptionGraphContext = createContext({} as CallsProps);

export const ConsumptuionGraphProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [callsGraph, setCallsGraph] = useState<CallsGraph[]>([]);
  const [monthFilter, setMonthFilter] =
    useState<SingleValue<IMonthFilter>>(null);

  const handleChange = (selectedOption: SingleValue<IMonthFilter>) => {
    setMonthFilter(selectedOption);
  };

  const getChartData = useCallback(
    async ({ month }: AnalyticParams): Promise<IChartData[]> => {
      try {
        const params: AnalyticParams = {
          ...(month ? { month } : { month: 8 }),
        };
        const { data } = await api.get<IChartData[]>('/consumption', {
          params,
        });
        data.map(ele => (ele.datetime = new Date(ele.datetime)).getTime());
        return data;
      } catch (err) {
        return throwHttpError(err);
      }
    },
    [],
  );

  const { data, isFetching, isError } = useQuery(
    ['consumption-page', callsGraph, monthFilter],
    // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    () => getChartData({ month: +monthFilter?.value! ?? 8 }),
    {
      keepPreviousData: true,
      // refetchInterval: INTERVAL_REFETCH_MS,
    },
  );

  return (
    <ConsumptionGraphContext.Provider
      value={{
        callsGraph: data ?? [],
        handleChange,
        error: isError,
        monthFilter,
      }}
    >
      {children}
    </ConsumptionGraphContext.Provider>
  );
};

export const useConsumptionGraph = (): CallsProps => {
  const context = useContext(ConsumptionGraphContext);
  return context;
};
