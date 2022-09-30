/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable camelcase */
import { useQuery } from '@tanstack/react-query';
import { sub } from 'date-fns';
import React, { createContext, useContext } from 'react';
import { INTERVAL_REFETCH_MS } from '../../../constants/constantsFeedback';
import { AnalyticParams } from '../../../models/Feedback';
import { InteractionFlowResponse } from '../../../models/InteractionFlow';
import api from '../../../services/api';
import { throwHttpError } from '../../../utils/throwHttpError';

interface Props {
  interactionFlowShort: InteractionFlowResponse[];
  interactionFlowExpanded: InteractionFlowResponse[];
  isFetching: boolean;
  isFetched: boolean;
  error: boolean;
}

const InteractionFlowContext = createContext({} as Props);

export const InteractionFlowProvider: React.FC = ({ children }) => {
  const getInteractionFlow = async ({
    location_code = 'BR',
    start_at = sub(new Date(), { months: 2 }).toISOString(),
    end_at,
    search,
    expanded = false,
  }: AnalyticParams): Promise<InteractionFlowResponse[]> => {
    try {
      const params: AnalyticParams = {
        location_code,
        start_at,
        expanded,
        ...(!!end_at && { end_at }),
        ...(!!search && { search }),
      };
      const { data } = await api.get<InteractionFlowResponse[]>(
        '/analytics/flows/resume',
        {
          params,
        },
      );
      return data;
    } catch (err) {
      return throwHttpError(err);
    }
  };

  const {
    data: interactionShort,
    isFetching,
    isFetched,
    isError,
  } = useQuery(['interaction-flow-short'], () => getInteractionFlow({}), {
    keepPreviousData: true,
    refetchInterval: INTERVAL_REFETCH_MS,
  });

  const { data: interactionExpanded } = useQuery(
    ['interaction-flow-expanded'],
    () => getInteractionFlow({ expanded: true }),
    {
      keepPreviousData: true,
      refetchInterval: INTERVAL_REFETCH_MS,
    },
  );

  return (
    <InteractionFlowContext.Provider
      value={{
        interactionFlowShort: interactionShort ?? [],
        interactionFlowExpanded: interactionExpanded ?? [],
        isFetched,
        isFetching,
        error: isError,
      }}
    >
      {children}
    </InteractionFlowContext.Provider>
  );
};

export const useInteractionFlow = () => {
  return useContext(InteractionFlowContext);
};
