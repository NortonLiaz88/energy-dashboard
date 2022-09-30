import styled from 'styled-components';
import { BiSearchAlt2 } from 'react-icons/bi';

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  margin-top: 3.7rem;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const Title = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.2rem;

  color: ${({ theme }) => theme.colors.description};

  margin-right: 2.4rem;
`;

export const InputWrapper = styled.div`
  border: 1px solid #bec0c2;
  border-radius: 30px;
  height: 4.8rem;
  flex: 1;

  display: flex;
  align-items: center;
  padding: 1.5rem;
`;

export const Search = styled(BiSearchAlt2).attrs({
  size: '2.5rem',
})`
  cursor: pointer;
`;

export const Input = styled.input`
  padding: 0 1.5rem;
  border: none;
  flex: 1;
`;
