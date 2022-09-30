import { MetaPagination } from '../../../models/Feedback';

export type CallsAnalyctsResponse = {
  calls: Call[];
  total: number;
  totalResolved: number;
  totalUnresolved: number;
  meta: MetaPagination;
};

export type Call = {
  id: string;
  user: string;
  reportedProblems: string[];
  atmModel: string;
  bankCode: number;
  startAt: string;
  duration: number;
  evaluation: number;
  feedback: string;
  wasSolved: boolean;
};
