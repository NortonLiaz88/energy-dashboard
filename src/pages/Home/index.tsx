import React from 'react';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { ConsumptuionGraphProvider } from '../../modules/Consumption/hooks/useConsumption';
import { DemandGraphProvider } from '../../modules/Demand/hooks/useDemand';
import { PowerFactorGraphProvider } from '../../modules/PoweFactor/hooks/usePowerFactor';

const Home: React.FC = () => {
  return (
    <DemandGraphProvider>
      <ConsumptuionGraphProvider>
        <PowerFactorGraphProvider>
          <DashboardTemplate />
        </PowerFactorGraphProvider>
      </ConsumptuionGraphProvider>
    </DemandGraphProvider>
  );
};

export default Home;
