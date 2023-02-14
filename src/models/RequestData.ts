export interface IRequestData {
  datetime: Date;
  month?: number;
  post: 'OFF_PEAK' | 'PEAK';
  value: number;
}

export interface IRequestProps {
  data: IRequestData[];
}
