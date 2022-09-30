import styled from 'styled-components';

interface WrapperProps {
  loading?: boolean;
  inModal: boolean;
  haveData: boolean;
}

export const ModuleWrapper = styled.div<WrapperProps>`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  margin-bottom: ${({ loading, inModal, haveData }) =>
    !loading && !inModal && !haveData ? '9.5rem' : '0rem'};
`;

export const PaginationWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
