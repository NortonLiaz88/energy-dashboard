/* eslint-disable react/require-default-props */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { RequestFailed } from '../../components/RequestFailed';
import { CloudWords } from './components/CloudWords';
import { useMostUsedWords } from './hooks/useMostUsedWords';

import { Container } from './styles';

interface Props {
  inModal?: boolean;
}

export const MostUsedWords: React.FC<Props> = ({ inModal = false }) => {
  const { isFetched, error, isFetching } = useMostUsedWords();
  if (isFetching && !isFetched) {
    return <Skeleton height="25rem" count={1} />;
  }
  if (error) {
    return <RequestFailed minHeight={25} />;
  }
  return (
    <Container inModal={inModal}>
      <CloudWords inModal={inModal} />
    </Container>
  );
};
