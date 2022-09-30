import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const ItemLink = styled(NavLink).attrs({})`
  display: flex;
  flex-direction: column;

  color: ${({ theme }) => theme.colors.description};
  font-family: Montserrat, sans-serif;
  font-weight: 800;

  font-size: 2rem;

  text-decoration: none;
`;

export const Underscore = styled.div`
  align-self: center;
  margin-top: 0.5rem;
  width: 4rem;
  height: 0.1rem;
  /* background-image: linear-gradient(to right, #0082bc, #470a68, #a6192e); */
  background-color: ${({ theme }) => theme.colors.navLink};
`;
