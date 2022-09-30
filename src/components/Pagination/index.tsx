/* eslint-disable react/require-default-props */
import React from 'react';

import {
  ArrowWrapper,
  Container,
  LeftArrow,
  PagesWrapper,
  RightArrow,
} from './styles';

interface Props {
  currentPage: number;
  firstItem: number;
  lastItem: number;
  totalItems: number;
  onPreviousPage: () => void;
  onForwardPage: () => void;
}

export const Pagination: React.FC<Props> = ({
  firstItem,
  currentPage,
  lastItem,
  totalItems,
  onForwardPage,
  onPreviousPage,
}) => {
  return (
    <Container>
      <PagesWrapper>
        <div className="page-description">
          <span>
            {firstItem} - {lastItem} de {totalItems}
          </span>
        </div>
        <ArrowWrapper
          disabled={currentPage === 0}
          onClick={() => onPreviousPage()}
        >
          <LeftArrow />
        </ArrowWrapper>
        <ArrowWrapper
          disabled={lastItem === totalItems}
          onClick={() => onForwardPage()}
        >
          <RightArrow />
        </ArrowWrapper>
      </PagesWrapper>
    </Container>
  );
};
