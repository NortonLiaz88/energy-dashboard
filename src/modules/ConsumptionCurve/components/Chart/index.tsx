/* eslint-disable camelcase */
import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5locales_pt_BR from '@amcharts/amcharts5/locales/pt_BR';

import { Container } from './styles';

export const ConsumptionCurveChart: React.FC = () => {
  const amChartRef = useRef({} as am5.Root);
  const chartId = 'consumptionCurveChart';

  useLayoutEffect(() => {
    const data = [
      {
        ax: 1,
        ay: 0.5,
        bx: 1,
        by: 2.2,
      },
      {
        ax: 2,
        ay: 1.3,
        bx: 2,
        by: 4.9,
      },
      {
        ax: 3,
        ay: 2.3,
        bx: 3,
        by: 5.1,
      },
      {
        ax: 4,
        ay: 2.8,
        bx: 4,
        by: 5.3,
      },
      {
        ax: 5,
        ay: 3.5,
        bx: 5,
        by: 6.1,
      },
      {
        ax: 6,
        ay: 5.1,
        bx: 6,
        by: 8.3,
      },
      {
        ax: 7,
        ay: 6.7,
        bx: 7,
        by: 10.5,
      },
      {
        ax: 8,
        ay: 8,
        bx: 8,
        by: 12.3,
      },
      {
        ax: 9,
        ay: 8.9,
        bx: 9,
        by: 14.5,
      },
      {
        ax: 10,
        ay: 9.7,
        bx: 10,
        by: 15,
      },
      {
        ax: 11,
        ay: 10.4,
        bx: 11,
        by: 18.8,
      },
      {
        ax: 12,
        ay: 11.7,
        bx: 12,
        by: 25,
      },
    ];

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    const root = am5.Root.new(chartId);
    root.locale = am5locales_pt_BR;

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      }),
    );

    chart?.get('colors')?.set('step', 2);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        strictMinMax: true,
        maxDeviation: 0,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
        tooltip: am5.Tooltip.new(root, {
          themeTags: ['axis'],
          animationDuration: 300,
        }),
      }),
    );

    // Adiciona cursor
    const cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
      }),
    );

    cursor.lineY.set('visible', false);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        strictMinMax: true,
        maxDeviation: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {
          themeTags: ['axis'],
          animationDuration: 300,
        }),
      }),
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series0 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Curva de carga',
        xAxis,
        yAxis,
        valueYField: 'ay',
        valueXField: 'ax',
        baseAxis: xAxis,
        tooltip: am5.Tooltip.new(root, {
          labelText: 'x:{valueX}, y:{valueY}',
        }),
      }),
    );

    series0.fills.template.setAll({
      fillOpacity: 0.5,
      visible: true,
    });

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series1 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Curva de geração',
        xAxis,
        yAxis,
        valueYField: 'by',
        valueXField: 'bx',
        baseAxis: yAxis,
        tooltip: am5.Tooltip.new(root, {
          labelText: 'x:{valueX}, y:{valueY}',
        }),
      }),
    );

    series1.fills.template.setAll({
      fillOpacity: 0.5,
      visible: true,
    });

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        xAxis,
        yAxis,
        snapToSeries: [series0],
      }),
    );

    // Add scrollbars
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      }),
    );

    // chart.set(
    //   'scrollbarY',
    //   am5.Scrollbar.new(root, {
    //     orientation: 'vertical',
    //   }),
    // );

    // const legend = chart.children.push(
    //   am5.Legend.new(root, {
    //     centerX: am5.p0,
    //     x: am5.p0,
    //     marginTop: 50,
    //   }),
    // );
    // legend.labels.template.setAll({
    //   fontWeight: '500',
    //   fontSize: 16,
    //   fill: am5.color(0x6c757d),
    // });
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      }),
    );

    legend.data.setAll(chart.series.values);

    // // Make series change state when legend item is hovered
    // legend.itemContainers.template.states.create('hover', {});

    // legend.itemContainers.template.events.on('pointerover', e => {
    //   (e.target.dataItem?.dataContext as any).hover();
    // });
    // legend.itemContainers.template.events.on('pointerout', e => {
    //   (e.target.dataItem?.dataContext as any).unhover();
    // });

    // legend.data.setAll(chart.series.values);

    series0.data.setAll(data);

    series1.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

    amChartRef.current = root;
    return () => amChartRef.current.dispose();
  }, [chartId]);

  return (
    <Container>
      <div id={chartId} style={{ width: '100%', height: 600 }} />
    </Container>
  );
};
/* Chart code */
// Data
