import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: ${props => props.theme.colors.backdrop};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  @media (min-width: 0px) {
    padding: 1.6rem;
  }
  @media (min-width: 300px) {
    padding: 1.6rem;
  }
  @media (min-width: 600px) {
    padding: 2.4rem;
  }

  min-width: 60%;
  max-width: 85%;
  max-height: 90%;
  background-color: ${props => props.theme.colors.shape};
  box-shadow: 0rem 0.8rem 2.4rem -0.01rem rgba(0, 0, 0, 0.2);
  border-radius: 0.8rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.6rem;

  h1 {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2.4rem;
    letter-spacing: 0.024rem;
    color: ${props => props.theme.colors.link};
  }
`;

export const CloseButton = styled(MdClose)`
  color: ${props => props.theme.colors.pagination};
  font-size: 2.4rem;

  &:hover {
    cursor: pointer;
  }
`;

export const ChildrenWrapper = styled.div`
  @media (min-height: 0px) {
    max-height: 40vh;
  }
  @media (min-height: 680px) {
    max-height: 60vh;
  }
  @media (min-height: 680px) {
    max-height: 60vh;
  }
  padding-right: 0.8rem;
  overflow-y: auto;
`;
