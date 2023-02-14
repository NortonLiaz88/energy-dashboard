/* eslint-disable camelcase */
import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5locales_pt_BR from '@amcharts/amcharts5/locales/pt_BR';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Container } from './styles';
import { IChart, IChartData } from '../../../../models/ChartData';

// export interface IChartData {
//   datetime: Date;
//   month?: string;
//   post: 'OFF_PEAK' | 'PEAK';
//   value: number;
// }

// export interface IChartProps {
//   data: IChartData[];
// }

export const DemandBarChart: React.FC<IChart> = ({ data }: IChart) => {
  const amChartRef = useRef({} as am5.Root);
  const chartId = 'demandBarChart';
  // console.log(data);
  useLayoutEffect(() => {
    const root = am5.Root.new(chartId);
    root.setThemes([am5themes_Animated.new(root)]);
    root.locale = am5locales_pt_BR;
    root.utc = true;
    root.dateFormatter.set('dateFormat', 'dd-MM-yy HH:mm');
    console.log('Data', data);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      }),
    );

    const cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'zoomX',
      }),
    );

    cursor.lineY.set('visible', false);

    const xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set('location', 0.5);
    xRenderer.labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5,
      fill: am5.color(0xbec0c2),
      visible: true,
    });
    let xAxis: am5xy.CategoryAxis<am5xy.AxisRenderer>;

    xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'date',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    xAxis.get('renderer').labels.template.setAll({
      oversizedBehavior: 'wrap',
      maxWidth: 150,
    });
    xAxis.data.setAll(data);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    yAxis.data.setAll(data);

    let series: am5xy.ColumnSeries;

    series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series',
        xAxis,
        yAxis,
        valueYField: 'value',
        categoryXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          labelText: `Valor:{value}\nData:{date}`,
        }),
      }),
    );

    series?.columns.template.adapters.add('fill', (fill, target) => {
      const dataItem = target?.dataItem;
      const contextData: IChartData = dataItem?.dataContext as IChartData;
      if (contextData.post === 'PEAK') {
        return am5.color('#EAE151');
      }
      return fill;
    });

    function createRange(
      localSerie: am5.Series,
      value: number,
      endValue: number,
      color: am5.Color,
    ) {
      const barRange = series.createAxisRange(
        yAxis.makeDataItem({
          value,
          endValue,
        }),
      );

      barRange.columns.template.setAll({
        fill: color,
        stroke: color,
      });

      barRange.axisDataItem?.get('axisFill')?.setAll({
        fill: color,
        fillOpacity: 0.05,
        visible: true,
      });

      const rangeDataItem = yAxis.makeDataItem({
        value,
        endValue,
      });

      const range = yAxis.createAxisRange(rangeDataItem);

      range?.get('label')?.setAll({
        fill: am5.color(0xffffff),
        text: value.toString(),
        background: am5.RoundedRectangle.new(root, {
          fill: color,
        }),
      });
    }

    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      }),
    );

    series.data.setAll(data);

    const rangeDataItem = yAxis.makeDataItem({
      value: 200,
      above: true,
      affectsMinMax: true,
    });

    yAxis.createAxisRange(rangeDataItem);

    createRange(series, 10000, 9999999, am5.color(0xff621f));

    const legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: 'name',
        fillField: 'color',
        strokeField: 'color',
        centerX: am5.percent(50),
        x: am5.percent(50),
      }),
    );

    legend.data.setAll([
      {
        name: 'Ponta',
        color: am5.color('#EAE151'),
      },
      {
        name: 'Fora Ponta',
        color: am5.color('#67b6dc'),
      },
    ]);

    series.appear(1000);
    chart.appear(1000, 100);

    amChartRef.current = root;
    return () => amChartRef.current.dispose();
  }, [chartId, data]);

  return (
    <Container>
      <div id={chartId} style={{ width: '100%', height: 600 }} />
    </Container>
  );
};
