import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { RequestFailed } from '../../components/RequestFailed';
import { FlowChart } from './components/FlowChart';
import { useInteractionFlow } from './hooks/useInteractionFlow';

import { Container } from './styles';

interface Props {
  // eslint-disable-next-line react/require-default-props
  inModal?: boolean;
}

export const InteractionFlow: React.FC<Props> = ({ inModal = false }) => {
  const {
    interactionFlowShort,
    interactionFlowExpanded,
    isFetched,
    isFetching,
    error,
  } = useInteractionFlow();
  if (!isFetched && isFetching) {
    return <Skeleton height="25rem" count={1} />;
  }
  if (error) {
    return <RequestFailed minHeight={25} />;
  }
  return (
    <Container inModal={inModal}>
      <FlowChart
        inModal={inModal}
        iterations={inModal ? interactionFlowExpanded : interactionFlowShort}
      />
    </Container>
  );
};
