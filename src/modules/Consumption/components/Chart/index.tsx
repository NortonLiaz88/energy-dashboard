/* eslint-disable camelcase */
import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5locales_pt_BR from '@amcharts/amcharts5/locales/pt_BR';
import { Container } from './styles';
import { IChartData, IChartProps } from '../../../Demand/components/BarChart';

export const ConsumptionChart: React.FC<IChartProps> = ({
  data,
}: IChartProps) => {
  const amChartRef = useRef({} as am5.Root);
  const chartId = 'consumptionChart';

  useLayoutEffect(() => {
    const root = am5.Root.new(chartId);

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);
    root.locale = am5locales_pt_BR;
    root.utc = true;
    root.dateFormatter.set('dateFormat', 'dd-MM-yy HH:mm');
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/

    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      }),
    );

    // const chart = root.container.children.push(
    //   am5xy.XYChart.new(root, {
    //     panX: false,
    //     panY: false,
    //     wheelX: 'panX',
    //     wheelY: 'zoomX',
    //     layout: root.verticalLayout,
    //   }),
    // );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    // const legend = chart.children.push(
    //   am5.Legend.new(root, {
    //     centerX: am5.p50,
    //     x: am5.p50,
    //   }),
    // );

    const cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'zoomX',
      }),
    );

    cursor.lineY.set('visible', false);
    // const date = new Date();
    // date.setHours(0, 0, 0, 0);
    // let value = 100;

    // function generateData() {
    //   value = Math.round(Math.random() * 10 - 5 + value);
    //   am5.time.add(date, 'day', 1);
    //   return {
    //     datetime: date.getTime(),
    //     value,
    //   };
    // }

    // function generateDatas(count: number) {
    //   const currentData = [];
    //   // eslint-disable-next-line no-plusplus
    //   for (let i = 0; i < count; ++i) {
    //     currentData.push(generateData());
    //   }
    //   return currentData;
    // }

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

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
        categoryField: 'datetime',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    xAxis.get('renderer').labels.template.setAll({
      oversizedBehavior: 'wrap',
      maxWidth: 150,
    });
    xAxis.data.setAll(data);

    // const xAxis = chart.xAxes.push(
    //   am5xy.DateAxis.new(root, {
    //     maxDeviation: 0,
    //     baseInterval: {
    //       timeUnit: 'minute',
    //       count: 15,
    //     },
    //     renderer: am5xy.AxisRendererX.new(root, {}),
    //     tooltip: am5.Tooltip.new(root, {}),
    //   }),
    // );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    yAxis.data.setAll(data);

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series',
        xAxis,
        yAxis,
        valueYField: 'value',
        categoryXField: 'datetime',
        tooltip: am5.Tooltip.new(root, {
          labelText: 'Valor:{value}\nData:{datetime}',
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
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      }),
    );

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

    // const currentData = generateDatas(50);
    series.data.setAll(data);

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

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
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
