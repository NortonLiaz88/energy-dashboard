import React, { useState } from 'react';
import Select, { SelectInstance, SingleValue } from 'react-select';
import { MonthOptions } from '../../utils/constants';
import { DemandBarChart } from './components/BarChart';
import { DemandChart } from './components/Chart';
import { IMonthFilter, useDemand } from './hooks/useDemand';
import { ModuleWrapper } from './styles';

export const DemandModule: React.FC = () => {
  const { handleChange, monthFilter, callsGraph } = useDemand();

  return (
    <ModuleWrapper>
      <Select
        value={monthFilter}
        defaultValue={MonthOptions[8]}
        options={MonthOptions}
        onChange={value => handleChange(value as IMonthFilter)}
      />
      <DemandBarChart data={callsGraph} />
    </ModuleWrapper>
  );
};
