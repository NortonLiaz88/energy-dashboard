import { IChartData } from '../../../models/ChartData';
import { IRequestData } from '../../../models/RequestData';
import { numberToMonth } from '../../../utils/formatNumberToMonth';

export const parsePowerFactorRequest = (
  databaseDemanda: IRequestData[],
): IChartData[] => {
  if (databaseDemanda[0].month) {
    // eslint-disable-next-line array-callback-return
    databaseDemanda.sort((a, b) => {
      if (a.month! > b.month!) return 1;

      if (a.month! < b.month!) return -1;
      return 0;
    });
  }

  else {
    // eslint-disable-next-line array-callback-return
    databaseDemanda = databaseDemanda.reverse();
  }
  let currentData: IChartData[] = databaseDemanda.map(ele => {
    let date: string | Date;
    if (ele.month) {
      date = numberToMonth(ele.month)!;
    } else {
      date = ele.datetime;
    }
    const newData: IChartData = {
      date: date,
      value: ele.value,
      post: ele.post,
    };
    return newData;
  });

  return currentData;
};
