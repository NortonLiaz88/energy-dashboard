export interface IChartData {
  date: string | Date;
  post: 'OFF_PEAK' | 'PEAK';
  value: number;
}

export interface IChart {
  data: IChartData[];
}
