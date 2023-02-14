import React, { ReactNode } from 'react';
import { EnhancedCSVLink } from './styles';

interface Props {
  data: any;
  headers?: string[];
  children: ReactNode
};

export const CustomCSVLink: React.FC<Props> = ({data, headers, children }: Props) => {
  return <EnhancedCSVLink data={data} headers={headers}>{children}</EnhancedCSVLink>;
};
