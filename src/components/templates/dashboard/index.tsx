import React from 'react';
import { ConsumptionModule } from '../../../modules/Consumption';
import { DemandModule } from '../../../modules/Demand';

import { PowerFactorModule } from '../../../modules/PoweFactor';

import Card from '../../atoms/Card';

import {
  AnalyticsSection,
  DashboardWrapper,
  UserInterationsWrapper,
  VerticalSizedBox,
} from './styles';

export const DashboardTemplate: React.FC = () => {
  return (
    <DashboardWrapper>
      <UserInterationsWrapper>
        <AnalyticsSection>
          <Card
            title="Demanda"
            children={<DemandModule />}
            expandFunction={() => null}
          />
          <Card
            title="Consumo"
            children={<ConsumptionModule />}
            expandFunction={() => null}
          />
          <Card
            title="Fator de Potência"
            children={<PowerFactorModule />}
            expandFunction={() => null}
          />
          {/* */}
          {/*
          <Card
            title="Curva de carga"
            children={<ConsumptionCurveModule />}
            expandFunction={() => null}
            fade
          />

          */}

          <VerticalSizedBox />
        </AnalyticsSection>
      </UserInterationsWrapper>
    </DashboardWrapper>
  );
};
