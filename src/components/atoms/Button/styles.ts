import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 24px;

  background-color: ${({ theme }) => theme.colors.tableHeader};
  border: none;
  border-radius: 0.8rem;

  color: ${({ theme }) => theme.colors.shape};

  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.7rem;
  /* identical to box height */

  letter-spacing: 0.0125em;

  &:hover {
    cursor: pointer;
  }
`;
