import React, { ReactNode } from 'react';
import {
  CardWrapper,
  TitleWrapper,
  Title,
  ExpandIcon,
  FadeCard,
} from './styles';

export interface CardProps {
  title?: string;
  children: ReactNode;
  expands?: boolean;
  expandFunction(): void;
  fade?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  expands = false,
  expandFunction,
  fade = false,
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
