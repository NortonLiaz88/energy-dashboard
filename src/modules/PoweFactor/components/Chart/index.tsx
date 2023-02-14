/* eslint-disable camelcase */
import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { Container } from './styles';
import { IChart } from '../../../../models/ChartData';

export const PowerFactorChart: React.FC<IChart> = ({
  data,
}: IChart) => {
  const amChartRef = useRef({} as am5.Root);
  const chartId = 'powerFactorChart';

  useLayoutEffect(() => {
    // Criando o elemento raiz
    const root = am5.Root.new(chartId);
    root.utc = true;
    root.dateFormatter.set('dateFormat', 'dd-MM-yy HH:mm');

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      }),
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    const cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'zoomX',
      }),
    );
    cursor.lineY.set('visible', false);

    // Generate random data
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set('location', 0.5);
    xRenderer.labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5,
      fill: am5.color(0xbec0c2),
      visible: true,
    });
    const xAxis = chart.xAxes.push(
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

    function createRange(value: number, endValue: number, color: am5.Color) {
      const rangeDataItem = yAxis.makeDataItem({
        value,
        endValue,
      });

      const range = yAxis.createAxisRange(rangeDataItem);

      if (endValue) {
        range?.get('axisFill')?.setAll({
          fill: color,
          fillOpacity: 0.2,
          visible: true,
        });

        range?.get('label')?.setAll({
          fill: am5.color(0xffffff),
          text: `${value}-${endValue}`,
          location: 1,
          background: am5.RoundedRectangle.new(root, {
            fill: color,
          }),
        });
      } else {
        range?.get('label')?.setAll({
          fill: am5.color(0xffffff),
          text: value.toString(),
          background: am5.RoundedRectangle.new(root, {
            fill: color,
          }),
        });
      }

      range?.get('grid')?.setAll({
        stroke: color,
        strokeOpacity: 1,
        location: 1,
      });

      // range?.fills?.template.setAll({
      //   fill: color,
      //   fillOpacity: 0.8,

      //   visible: true,
      // });

      rangeDataItem?.get('axisFill')?.setAll({
        fill: color,
        fillOpacity: 0.05,
        visible: true,
      });
    }

    createRange(0.91, -9999, am5.color(0xff621f));

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Series',
        xAxis,
        yAxis,
        valueYField: 'value',
        categoryXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          labelText: 'Valor:{value}\nData:{date}',
        }),
      }),
    );

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      }),
    );

    // const currentData = generateDatas(50);
    series.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    amChartRef.current = root;

    return () => amChartRef.current.dispose();

    // const currentData = [
    //   {
    //     timestamp: new Date(2020, 0, 1, 22, 30).getTime(),
    //     value: 99.71,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 1, 23, 0).getTime(),
    //     value: 99.13,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 1, 23, 30).getTime(),
    //     value: 98.5,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 0, 0).getTime(),
    //     value: 101,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 0, 30).getTime(),
    //     value: 99.45,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 1, 0).getTime(),
    //     value: 100.9,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 1, 30).getTime(),
    //     value: 100.39,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 2, 0).getTime(),
    //     value: 101.1,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 2, 30).getTime(),
    //     value: 101.45,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 3, 0).getTime(),
    //     value: 101.15,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 3, 30).getTime(),
    //     value: 100.5,
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 4, 0).getTime(),
    //     value: 101.55,
    //     // bulletSettings: { fill: am5.color('#f0c803') },
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 4, 30).getTime(),
    //     value: 101.7,
    //     // bulletSettings: { fill: am5.color('#970505') },
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 5, 0).getTime(),
    //     value: 100.5,
    //     // bulletSettings: { fill: am5.color('#f0c803') },
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 5, 30).getTime(),
    //     value: 100.92,
    //     // bulletSettings: { fill: am5.color('#f0c803') },
    //   },
    //   {
    //     timestamp: new Date(2020, 0, 2, 6, 0).getTime(),
    //     value: 102.2,
    //     // bulletSettings: { fill: am5.color('#970505') },
    //   },
    // ];

    // series.data.setAll(data);
    // legend.data.setAll(chart.series.values);

    // chart.set(
    //   'scrollbarX',
    //   am5.Scrollbar.new(root, {
    //     orientation: 'horizontal',
    //   }),
    // );

    // amChartRef.current = root;
    // return () => amChartRef.current.dispose();
  }, [chartId, data]);

  return (
    <Container>
      <div id={chartId} style={{ width: '100%', height: 600 }} />
    </Container>
  );
};
