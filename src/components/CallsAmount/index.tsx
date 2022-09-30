import React from 'react';

import { Container, ResolvedCalls, UnresolvedCalls } from './styles';

interface Props {
  resolvedCalls: number;
  unresolvedCalls: number;
}

export const CallsAmount: React.FC<Props> = ({
  resolvedCalls,
  unresolvedCalls,
}) => {
  return (
    <Container>
      <ResolvedCalls>
        <span>{resolvedCalls} resolvidos</span>
      </ResolvedCalls>
      <UnresolvedCalls>
        <span>{unresolvedCalls} não resolvidos</span>
      </UnresolvedCalls>
    </Container>
  );
};
