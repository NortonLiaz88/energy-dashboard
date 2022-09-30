import format from 'date-fns/format';

export const formatDate = (date: string): string => {
  return format(new Date(date), 'dd/MM/Y');
};
