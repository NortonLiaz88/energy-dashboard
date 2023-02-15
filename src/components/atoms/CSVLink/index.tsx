import React, { ReactNode } from 'react';
import { EnhancedCSVLink } from './styles';

interface Props {
  data: any;
  headers?: string[];
  children: ReactNode;
  name?: string;
}

export const CustomCSVLink: React.FC<Props> = ({
  data,
  headers,
  children,
  name,
}: Props) => {
  return (
    <EnhancedCSVLink
      filename={`panilha ${name ? name : new Date().getTime()}`}
      data={data}
      headers={headers}
    >
      {children}
    </EnhancedCSVLink>
  );
};
