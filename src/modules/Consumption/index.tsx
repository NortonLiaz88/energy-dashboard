import React, { useState } from 'react';
import Select, { SelectInstance, SingleValue } from 'react-select';
import { MonthOptions } from '../../utils/constants';
import { ConsumptionChart } from './components/Chart';
import { IMonthFilter } from '../Demand/hooks/useDemand';

import { useConsumptionGraph } from './hooks/useConsumption';
import { ModuleWrapper } from './styles';

export const ConsumptionModule: React.FC = () => {
  const { handleChange, monthFilter, callsGraph } = useConsumptionGraph();
  return (
    <ModuleWrapper>
      <Select
        value={monthFilter}
        defaultValue={MonthOptions[2]}
        options={MonthOptions}
        onChange={value => handleChange(value as IMonthFilter)}
      />
      <ConsumptionChart data={callsGraph} />
    </ModuleWrapper>
  );
};
