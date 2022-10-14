import React, { ReactNode } from 'react';
import { CardWrapper, TitleWrapper, Title, ExpandIcon } from './styles';

export interface CardProps {
  title?: string;
  children: ReactNode;
  expands?: boolean;
  expandFunction(): void;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  expands = false,
  expandFunction,
}: CardProps) => {
  return (
    <CardWrapper>
      {title && (
        <TitleWrapper>
          <Title>{title}</Title>
          {expands && <ExpandIcon onClick={expandFunction} />}
        </TitleWrapper>
      )}
      {children}
    </CardWrapper>
  );
};

export default Card;
