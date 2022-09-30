/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable camelcase */

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { sub } from 'date-fns';

import { AnalyticParams, MetaPagination } from '../../../models/Feedback';
import api from '../../../services/api';
import { CallsAnalyctsResponse } from '../models/CallsAnalytics';
import { throwHttpError } from '../../../utils/throwHttpError';
import { formatDate } from '../../../utils/formatDate';
import {
  defaultMetaPagination,
  defaultPagination,
  INTERVAL_REFETCH_MS,
} from '../../../constants/constantsFeedback';

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
  pagination: {
    firstItem: number;
    lastItem: number;
    page: number;
    pageSize: number;
    totalItem: number;
    totalPages: number;
  };
  serviceCallsData: CallsAnalyctsResponse;
  totalResolved: number;
  totalUnresolved: number;
  loading: boolean;
  currentOrder: string;
  ordenableItens: OrderItem[];
  isFetching: boolean;
  error: boolean;
  getCallsHistory: ({
    page,
    location_code,
    page_size,
    start_at,
    search,
    end_at,
    sort_by,
  }: AnalyticParams) => void;
  makeQuery: (orders: OrderItem[]) => string;
  updateOrdenableItens: (value: OrderItem) => void;
  ordenateTable: (order: OrderBy) => void;
  filterBar: (value: string) => void;
  handlePreviousPage: () => void;
  handleForwardPage: () => void;
}

const CallsContext = createContext({} as CallsProps);

export const CallsProvider: React.FC<CallsProviderProviderProps> = ({
  children,
}) => {
  const [currentOrder, setCurrentOrder] = useState<OrderBy>('');
  const [inputFilter, setInputFilter] = useState('');

  const [ordenableItens, setOrdenableItens] = useState<OrderItem[]>([]);
  const [orderQuery, setOrderQuery] = useState('-startAt');

  const [totalResolved, setTotalResolved] = useState(0);
  const [totalUnresolved, setTotalUnResolved] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const paginationRef = useRef(defaultPagination);

  const makeQuery = useCallback(
    (orders: OrderItem[]): string => {
      let query = '';
      orders.forEach((ele, index) => {
        query += `${ele.status === 'positive' ? '+' : '-'}${ele.name}`;

        if (index !== orders.length - 1) {
          query += ',';
        }
      });
      setOrderQuery(query);
      return query;
    },
    [orderQuery],
  );

  const getCallsHistory = useCallback(
    async ({
      page = 0,
      location_code = 'BR',
      page_size = 10,
      start_at = sub(new Date(), { months: 12 }).toISOString(),
      search,
      end_at,
      sort_by = '-startAt',
    }: AnalyticParams): Promise<CallsAnalyctsResponse> => {
      try {
        const params: AnalyticParams = {
          page,
          location_code,
          page_size,
          search,
          start_at,
          ...(!!end_at && { end_at }),
          ...(!!search && { search }),
          ...(!!sort_by && { sort_by }),
        };
        const { data } = await api.get<CallsAnalyctsResponse>(
          '/analytics/calls',
          {
            params,
          },
        );
        data.calls.map(ele => (ele.startAt = formatDate(ele.startAt)));
        return data;
      } catch (err) {
        return throwHttpError(err);
      }
    },
    [],
  );

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

  const setPagination = useCallback(
    ({ meta, total }: CallsAnalyctsResponse) => {
      paginationRef.current = {
        firstItem: firstItemPagination(meta),
        lastItem: lastItemPagination(meta, total),
        page: meta.page,
        pageSize: meta.pageSize,
        totalItem: total,
        totalPages: meta.totalPages,
      };
    },
    [],
  );

  const handleCallsAnalytics = useCallback(
    async (callsAnalyticsResponse: CallsAnalyctsResponse) => {
      setTotalResolved(callsAnalyticsResponse.totalResolved);
      setTotalUnResolved(callsAnalyticsResponse.totalUnresolved);
      setPagination(callsAnalyticsResponse);
    },
    [setPagination],
  );

  const canForward = useCallback(() => {
    return paginationRef.current.totalPages > paginationRef.current.page + 1;
  }, []);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage(oldPage => Math.max(oldPage - 1, 0));
  }, []);

  const handleForwardPage = useCallback(() => {
    if (canForward()) {
      setCurrentPage(oldPage => oldPage + 1);
    }
  }, [canForward]);

  const { data, isFetching, isError } = useQuery(
    ['calls-page', currentPage, orderQuery, inputFilter],
    () =>
      getCallsHistory({
        page: currentPage,
        sort_by: orderQuery,
        search: inputFilter ?? '',
      }),
    {
      keepPreviousData: true,
      refetchInterval: INTERVAL_REFETCH_MS,
      onSuccess(data) {
        handleCallsAnalytics(data);
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

  const updateOrdenableItens = useCallback(
    (value: OrderItem) => {
      const orderAlreadyExists = ordenableItens.find(
        ele => ele.name === value.name,
      );
      if (orderAlreadyExists) {
        const updatedOrders = ordenableItens.filter(
          ele => ele.name !== orderAlreadyExists.name,
        );
        if (updatedOrders && updatedOrders.length > 0) {
          setOrdenableItens([value, ...(updatedOrders as OrderItem[])]);
          makeQuery([value, ...(updatedOrders as OrderItem[])]);
        } else {
          setOrdenableItens([value]);
          makeQuery([value, ...(updatedOrders as OrderItem[])]);
        }
      } else {
        setOrdenableItens([value, ...ordenableItens]);
        makeQuery([value, ...ordenableItens]);
      }
    },
    [ordenableItens, makeQuery],
  );

  const ordenateTable = useCallback(
    (order: OrderBy) => {
      setCurrentOrder(order);
      const orderAlreadyExists = ordenableItens.find(ele => ele.name === order);
      if (orderAlreadyExists) {
        const updatedOrder = {
          name: order,
          status:
            orderAlreadyExists.status === 'positive' ? 'negative' : 'positive',
        } as OrderItem;
        updateOrdenableItens(updatedOrder);
      } else {
        updateOrdenableItens({
          name: order,
          status: 'positive',
        });
      }
    },
    [ordenableItens, updateOrdenableItens],
  );

  const filterBar = useCallback((value: string) => {
    setInputFilter(value);
  }, []);

  return (
    <CallsContext.Provider
      value={{
        serviceCallsData: data ?? ({} as CallsAnalyctsResponse),
        totalResolved,
        totalUnresolved,
        loading: isFetching,
        currentOrder,
        ordenableItens,
        getCallsHistory,
        makeQuery,
        updateOrdenableItens,
        ordenateTable,
        pagination,
        isFetching,
        handlePreviousPage,
        handleForwardPage,
        filterBar,
        error: isError,
      }}
    >
      {children}
    </CallsContext.Provider>
  );
};

export const useCalls = (): CallsProps => {
  const context = useContext(CallsContext);
  return context;
};
