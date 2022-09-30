import { MetaPagination } from '../models/Feedback';

export const defaultPagination = {
  page: 0,
  totalPages: 0,
  pageSize: 0,
  totalItem: 0,
  firstItem: 0,
  lastItem: 0,
};

export const defaultMetaPagination: MetaPagination = {
  page: 0,
  pageSize: 10,
  sortBy: { callStartTime: -1 },
  totalPages: 0,
};

export const defaultCalls = { totalResolved: 0, totalUnresolved: 0 };

export const defaultScore = {
  averageRating: 0,
  totalPerRating: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
};

export const INTERVAL_REFETCH_MS = 5 * 60 * 1000;
