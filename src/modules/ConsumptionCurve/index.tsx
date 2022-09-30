import React from 'react';
import { ConsumptionCurveChart } from './components/Chart';
import { ModuleWrapper } from './styles';

export const ConsumptionCurveModule: React.FC = () => {
  return (
    <ModuleWrapper>
      <ConsumptionCurveChart />
    </ModuleWrapper>
  );
};
