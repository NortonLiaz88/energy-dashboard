import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5flow from '@amcharts/amcharts5/flow';

import { Container, containerStyle, flowChartStyle } from './styles';
import { InteractionFlowResponse } from '../../../../models/InteractionFlow';

interface Props {
  inModal: boolean;
  iterations: InteractionFlowResponse[];
}

export const FlowChart: React.FC<Props> = ({ inModal = false, iterations }) => {
  const divId = inModal ? 'divflowchartmodal' : 'divflowchart';
  useLayoutEffect(() => {
    const root = am5.Root.new(divId);
    const container = root.container.children.push(
      am5.Container.new(root, {
        ...containerStyle,
        layout: root.verticalLayout,
        paddingRight: inModal ? 200 : 100,
      }),
    );
    const series = container.children.push(
      am5flow.Sankey.new(root, {
        ...flowChartStyle,
      }),
    );
    series.data.setAll(iterations);
    return () => root.dispose();
  }, [divId, inModal, iterations]);

  return <Container id={divId} inModal={inModal} />;
};
