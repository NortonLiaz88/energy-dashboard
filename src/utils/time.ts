/* eslint-disable import/no-duplicates */
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const durationBetween = (firstDate: Date, secondDate: Date): string => {
  const duration = formatDistance(firstDate, secondDate, {
    locale: ptBR,
  });
  return duration;
};
