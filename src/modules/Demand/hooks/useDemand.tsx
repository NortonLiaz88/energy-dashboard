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
// import { IChartData, IChartProps } from '../components/BarChart';
import { parseDemandaRequest } from '../utils/parseDataToChart';
import { IRequestData } from '../../../models/RequestData';
import { IChart, IChartData } from '../../../models/ChartData';

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

export interface ProviderProps {
  children: ReactNode;
}

export interface CallsProps {
  callsGraph: IChartData[];
  handleChange: (selectedOption: SingleValue<IMonthFilter>) => void;
  error: boolean;
  monthFilter: SingleValue<IMonthFilter>;
}

export interface IMonthFilter {
  value: string;
  label: string;
}

const DemandGraphContext = createContext({} as CallsProps);

export const DemandGraphProvider: React.FC<ProviderProps> = ({ children }) => {
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
        const { data } = await api.get<IRequestData[]>('/demand', {
          params,
        });
        data.map(ele => (ele.datetime = new Date(ele.datetime)).getTime());
        const parsedData = parseDemandaRequest(data)

        return parsedData;
      } catch (err) {
        return throwHttpError(err);
      }
    },
    [],
  );

  const getAllChartData = useCallback(async (): Promise<IChartData[]> => {
    try {
      const { data } = await api.get<IRequestData[]>('/demand/by-month');
      const parsedData = parseDemandaRequest(data)
      return parsedData;
    } catch (err) {
      return throwHttpError(err);
    }
  }, []);

  const { data, isFetching, isError } = useQuery(
    ['demand-page', callsGraph, monthFilter],
    () =>
      monthFilter?.value! === 'all'
        ? getAllChartData()
        : getChartData({ month: +monthFilter?.value! ?? 8 }),
    {
      keepPreviousData: true,
      retry: false
      // refetchInterval: INTERVAL_REFETCH_MS,
    },
  );

  return (
    <DemandGraphContext.Provider
      value={{
        callsGraph: data ?? [],
        handleChange,
        error: isError,
        monthFilter,
      }}
    >
      {children}
    </DemandGraphContext.Provider>
  );
};

export const useDemand = (): CallsProps => {
  const context = useContext(DemandGraphContext);
  return context;
};
