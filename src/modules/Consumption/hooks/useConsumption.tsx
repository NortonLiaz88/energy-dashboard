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

import React, { createContext, useCallback, useContext, useState } from 'react';
import { AnalyticParams } from '../../../models/Feedback';
import api from '../../../services/api';
import { throwHttpError } from '../../../utils/throwHttpError';
import {
  CallsProps,
  IMonthFilter,
  ProviderProps,
} from '../../Demand/hooks/useDemand';
import { IChart, IChartData } from '../../../models/ChartData';
import { parseConsumptionRequest } from '../utils/parseDataToChart';
import { IRequestData } from '../../../models/RequestData';

const ConsumptionGraphContext = createContext({} as CallsProps);

export const ConsumptuionGraphProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [callsGraph, setCallsGraph] = useState<IChart[]>([]);
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
        const { data } = await api.get<IRequestData[]>('/consumption', {
          params,
        });
        data.map(ele => (ele.datetime = new Date(ele.datetime)).getTime());
        const parsedData = parseConsumptionRequest(data)
        return parsedData;
      } catch (err) {
        return throwHttpError(err);
      }
    },
    [],
  );

  const getAllChartData = useCallback(async (): Promise<IChartData[]> => {
    try {
      const { data } = await api.get<IRequestData[]>('/consumption/by-month');
      data.map(ele => (ele.datetime = new Date(ele.datetime)).getTime());
      const parsedData = parseConsumptionRequest(data)

      return parsedData;
    } catch (err) {
      return throwHttpError(err);
    }
  }, []);

  const { data, isFetching, isError } = useQuery(
    ['consumption-page', callsGraph, monthFilter],
    // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    () =>  monthFilter?.value! === 'all'
    ? getAllChartData()
    : getChartData({ month: +monthFilter?.value! ?? 8 }),
    {
      keepPreviousData: true,
      retry: false
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
