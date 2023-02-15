import React from 'react';
import Select from 'react-select';
import { CustomCSVLink } from '../../components/atoms/CSVLink';
import { MonthOptions } from '../../utils/constants';
import { DemandBarChart } from './components/BarChart';
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
      <CustomCSVLink
        data={callsGraph}
        name={monthFilter?.label.toLocaleLowerCase()}
      >
        Download CSV
      </CustomCSVLink>
    </ModuleWrapper>
  );
};
