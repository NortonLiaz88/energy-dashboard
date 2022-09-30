/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import { formatDuration } from 'date-fns';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import theme from '../../../../styles/theme';
import { OrderBy, OrderItem } from '../../hooks/useTableHook';
import { Call } from '../../models/CallsAnalytics';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableData,
  TableHeaderRow,
  UpOrderIcon,
  StartIcon,
  TableWrapper,
  DowOrderIcon,
  FeedbackText,
  RelatedProblem,
} from './styles';

export type TableHeaderProps = {
  name: string;
  ordenable: boolean;
  value?: string;
};

export interface TableProps {
  headerItems: TableHeaderProps[];
  tableData: Call[];
  loading: boolean;
  ordenableItens: OrderItem[];
  updateOrdenableItens: (value: OrderItem) => void;
  ordenateBy: (category: OrderBy) => void;
}

const ServiceTable: React.FC<TableProps> = ({
  headerItems,
  tableData,
  loading,
  ordenableItens,
  ordenateBy,
}: TableProps) => {
  return (
    <TableWrapper>
      {!loading ? (
        <Table>
          <TableHead>
            <TableHeaderRow>
              {headerItems.map((item, index) => {
                return (
                  <TableHeader
                    key={`${item}_${index}`}
                    onClick={() => {
                      item.ordenable ? ordenateBy(item.value as OrderBy) : null;
                    }}
                  >
                    {item.name}{' '}
                    {item.ordenable &&
                    ordenableItens.find(ele => {
                      return (
                        ele.name === item.value && ele.status === 'positive'
                      );
                    }) ? (
                      <UpOrderIcon />
                    ) : (
                      ordenableItens.find(
                        ele =>
                          ele.name === item.value && ele.status === 'negative',
                      ) && <DowOrderIcon />
                    )}
                  </TableHeader>
                );
              })}
            </TableHeaderRow>
          </TableHead>
          <TableBody>
            {tableData?.length > 0 &&
              tableData.map((item, index) => {
                return (
                  <TableRow key={`${item}_${index}`}>
                    <TableData>
                      {item.reportedProblems.map(ele => {
                        return (
                          <RelatedProblem key={`Problem_${ele}`}>
                            {ele.toLowerCase()}
                          </RelatedProblem>
                        );
                      })}
                    </TableData>
                    <TableData>{item.user}</TableData>
                    <TableData>{item.atmModel}</TableData>
                    <TableData>{item.bankCode}</TableData>
                    <TableData>{item.startAt}</TableData>
                    <TableData>
                      {formatDuration({ seconds: item.duration })}
                    </TableData>
                    <TableData>
                      {[0, 1, 2, 3, 4].map(acc => (
                        <StartIcon
                          key={`Star_${acc}`}
                          style={{
                            color:
                              item.evaluation >= acc
                                ? theme.colors.starFilled
                                : theme.colors.starEmpty,
                          }}
                        />
                      ))}
                    </TableData>
                    <TableData>
                      <FeedbackText>{item.feedback}</FeedbackText>
                    </TableData>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      ) : (
        <Skeleton height="6rem" count={10} />
      )}
    </TableWrapper>
  );
};

export default ServiceTable;
