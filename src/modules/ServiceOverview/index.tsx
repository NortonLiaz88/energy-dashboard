import React from 'react';
import { CallsAmount } from '../../components/CallsAmount';
import { Pagination } from '../../components/Pagination';
import { RequestFailed } from '../../components/RequestFailed';
import Filter from './components/Filter';
import SeeMore from './components/SeeMore';
import ServiceGraph from './components/ServiceGraph';
import Table, { TableHeaderProps } from './components/Table';
import { useCallsGraph } from './hooks/useCallsGraph';
import { useCalls } from './hooks/useTableHook';

import { ModuleWrapper, PaginationWrapper } from './styles';

interface Props {
  // eslint-disable-next-line react/require-default-props
  inModal?: boolean;
  // eslint-disable-next-line react/require-default-props
  openModal?: () => void;
}

const ServiceOverview: React.FC<Props> = ({
  inModal = false,
  openModal = () => null,
}) => {
  const {
    serviceCallsData,
    isFetching,
    ordenableItens,
    pagination,
    ordenateTable,
    filterBar,
    updateOrdenableItens,
    handleForwardPage,
    handlePreviousPage,
    error: errorCalls,
  } = useCalls();

  const { handleFilterGraph, error: errorGraphs } = useCallsGraph();

  const { callsGraph } = useCallsGraph();

  const handleFilter = (value: string) => {
    filterBar(value);
    handleFilterGraph(value);
  };

  const problems: TableHeaderProps[] = [
    { name: 'Problema(s) relatado(s)', ordenable: false },
    { name: 'Usuário', ordenable: true, value: 'user' },
    { name: 'ATM', ordenable: true, value: 'atmModel' },
    { name: 'Banco', ordenable: true, value: 'bankCode' },
    { name: 'Data', ordenable: true, value: 'startAt' },
    { name: 'Duração', ordenable: true, value: 'duration' },
    { name: 'Nota', ordenable: true, value: 'evaluation' },
    { name: 'Comentário', ordenable: false },
  ];

  if (errorCalls || errorGraphs) {
    return <RequestFailed minHeight={50} enableEmoji />;
  }

  return (
    <ModuleWrapper
      inModal={inModal}
      haveData={serviceCallsData?.calls?.length > 0}
    >
      <ServiceGraph inModal={inModal} data={callsGraph} />
      <Filter onFilter={filter => handleFilter(filter)} />
      <Table
        ordenableItens={ordenableItens}
        updateOrdenableItens={updateOrdenableItens}
        headerItems={problems}
        ordenateBy={ele => ordenateTable(ele)}
        tableData={serviceCallsData.calls}
        loading={isFetching}
      />
      {serviceCallsData?.calls?.length > 0 && !inModal && (
        <SeeMore onClick={() => openModal()} />
      )}

      {inModal && (
        <PaginationWrapper>
          <CallsAmount
            resolvedCalls={serviceCallsData.totalResolved}
            unresolvedCalls={serviceCallsData.totalUnresolved}
          />
          <Pagination
            firstItem={pagination.firstItem}
            lastItem={pagination.lastItem}
            totalItems={pagination.totalItem}
            onPreviousPage={() => handlePreviousPage()}
            onForwardPage={() => handleForwardPage()}
            currentPage={pagination.page}
          />
        </PaginationWrapper>
      )}
    </ModuleWrapper>
  );
};

export default ServiceOverview;
