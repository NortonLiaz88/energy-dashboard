import React from 'react';
import Select from 'react-select';
import { MonthOptions } from '../../utils/constants';
import { ConsumptionChart } from './components/Chart';
import { IMonthFilter } from '../Demand/hooks/useDemand';

import { useConsumptionGraph } from './hooks/useConsumption';
import { ModuleWrapper } from './styles';
import { CustomCSVLink } from '../../components/atoms/CSVLink';

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
      <CustomCSVLink data={callsGraph}>Download CSV</CustomCSVLink>

    </ModuleWrapper>
  );
};
