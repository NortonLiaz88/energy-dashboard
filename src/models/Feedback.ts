export enum StarType {
  full = 'full',
  half = 'half',
  empty = 'empty',
}

export type ScoreLevelProps = {
  label: string;
  percentage: number;
};

export type FeedbackProps = {
  agentName: string;
  evaluation: number;
  feedback: string;
  callStartTime: string;
  callDuration: number;
  wasSolved: boolean;
  atmModel: string;
};

export type TotalPerRating = {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
};

export type MetaPagination = {
  page: number;
  pageSize: number;
  sortBy: { callStartTime: number };
  totalPages: number;
};

export type FeedbacksResponse = {
  feedbacks: FeedbackProps[];
  total: number;
  totalResolved: number;
  totalUnresolved: number;
  averageRating: number;
  totalPerRating: TotalPerRating;
  meta: MetaPagination;
};

export type AnalyticParams = {
  search?: string;
  month?: number;
  page?: number;
  page_size?: number;
  end_at?: string;
  start_at?: string;
  location_code?: string;
  sort_by?: string;
  period?: 'DAY' | 'MONTH' | 'YEAR';
  tz_offset?: string;
  expanded?: boolean;
};
