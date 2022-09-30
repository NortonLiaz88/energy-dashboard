import React, { useState } from 'react';
import Select, { SelectInstance, SingleValue } from 'react-select';
import { MonthOptions } from '../../utils/constants';
import { IMonthFilter } from '../Demand/hooks/useDemand';
import { PowerFactorChart } from './components/Chart';
import { usePowerFactorGraph } from './hooks/usePowerFactor';
import { ModuleWrapper } from './styles';

export const PowerFactorModule: React.FC = () => {
  const { handleChange, monthFilter, callsGraph } = usePowerFactorGraph();
  return (
    <ModuleWrapper>
      <Select
        value={monthFilter}
        defaultValue={MonthOptions[2]}
        options={MonthOptions}
        onChange={value => handleChange(value as IMonthFilter)}
      />
      <PowerFactorChart data={callsGraph} />
    </ModuleWrapper>
  );
};