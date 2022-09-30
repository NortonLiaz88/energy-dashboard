import styled from 'styled-components';

export const Container = styled.div<{ fullWidth: boolean }>`
  width: ${props => (props.fullWidth ? '100%' : '')};
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 95%;
    height: 95%;
  }
`;
