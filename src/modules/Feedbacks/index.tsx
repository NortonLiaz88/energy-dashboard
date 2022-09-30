/* eslint-disable react/require-default-props */
import React from 'react';

import { useFeedbacks } from './hooks/useFeedbacks';
import { Pagination } from '../../components/Pagination';
import { FeedbackList } from './components/FeedbackList';
import { FeedbackHeader } from './components/FeedbackHeader';

import { Container, PaginationWrapper } from './styles';
import { CallsAmount } from '../../components/CallsAmount';
import SeeMore from '../ServiceOverview/components/SeeMore';
import { RequestFailed } from '../../components/RequestFailed';

interface Props {
  inModal?: boolean;
  openModal?: () => void;
}

export const Feedbacks: React.FC<Props> = ({
  inModal = false,
  openModal = () => null,
}) => {
  const { pagination, calls, handleForwardPage, handlePreviousPage, error } =
    useFeedbacks();

  const hasMoreFeedbacks = pagination.totalItem ?? 0 > 5;

  if (error) {
    return <RequestFailed minHeight={50} enableEmoji />;
  }

  return (
    <Container>
      <FeedbackHeader />
      <FeedbackList inModal={inModal} />
      {!inModal && hasMoreFeedbacks && <SeeMore onClick={() => openModal()} />}
      {inModal && (
        <PaginationWrapper>
          <CallsAmount
            resolvedCalls={calls.current.totalResolved}
            unresolvedCalls={calls.current.totalUnresolved}
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
    </Container>
  );
};
