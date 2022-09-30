/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Container } from './styles';
import { CallsGraph } from '../../models/CallsGraph';
import theme from '../../../../styles/theme';

interface Props {
  inModal: boolean;
  data: CallsGraph[];
}

const ServiceGraph: React.FC<Props> = ({ data, inModal }: Props) => {
  const amChartRef = useRef({} as am5.Root);

  const chartId = `chartreversedgraphdiv${inModal ? 'modal' : 'offModal'}`;
  useLayoutEffect(() => {
    // Criando o elemento raiz
    const root = am5.Root.new(chartId);

    // Definindo tema
    root.setThemes([am5themes_Animated.new(root)]);

    // Criando chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        pinchZoomX: true,
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

    // Criando eixos
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

    xAxis.data.setAll(data);

    const yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.grid.template.set('location', 0.5);
    yRenderer.labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5,
      fill: am5.color(0xbec0c2),
      visible: true,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        renderer: yRenderer,
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: '####.00',
        }),
      }),
    );

    // Criando a série
    function createSeries(name: string, field: string, color: number | string) {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueYField: field,
          categoryXField: 'date',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '[bold]{name}[/]\n{categoryX}: {valueY}',
          }),
        }),
      );

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 6,
            fill: series.get('fill'),
          }),
        });
      });

      // create hover state for series and for mainContainer, so that when series is hovered,
      // the state would be passed down to the strokes which are in mainContainer.
      series.set('setStateOnChildren', true);
      series.set('fill', am5.color(color));
      series.set('stroke', am5.color(color));
      series.strokes.template.setAll({
        strokeWidth: 4,
      });
      series.states.create('hover', {});

      series.mainContainer.set('setStateOnChildren', true);
      series.mainContainer.states.create('hover', {});

      series.strokes.template.states.create('hover', {
        strokeWidth: 4,
      });

      series.data.setAll(data);
      series.appear(1000);
    }

    createSeries(
      'Atendimentos resolvidos',
      'totalResolved',
      theme.colors.charts.resolved,
    );
    createSeries(
      'Atendimentos não resolvidos',
      'totalUnresolved',
      theme.colors.charts.unresolved,
    );

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p0,
        x: am5.p0,
        marginTop: 50,
      }),
    );
    legend.labels.template.setAll({
      fontWeight: '500',
      fontSize: 16,
      fill: am5.color(0x6c757d),
    });

    // Make series change state when legend item is hovered
    legend.itemContainers.template.states.create('hover', {});

    legend.itemContainers.template.events.on('pointerover', e => {
      (e.target.dataItem?.dataContext as any).hover();
    });
    legend.itemContainers.template.events.on('pointerout', e => {
      (e.target.dataItem?.dataContext as any).unhover();
    });

    legend.data.setAll(chart.series.values);

    chart.appear(1000, 100);

    amChartRef.current = root;
    return () => amChartRef.current.dispose();
  }, [data, chartId]);

  return (
    <Container>
      <div id={chartId} style={{ width: '100%', height: 600 }} />
    </Container>
  );
};

export default ServiceGraph;
