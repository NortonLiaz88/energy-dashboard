import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export const DisplayFlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled(DisplayFlexCenter)`
  display: flex;
  align-items: center;
`;

export const PagesWrapper = styled.div`
  display: flex;

  .page-description {
    padding: 0.6rem;
    span {
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 2.4rem;
      color: ${props => props.theme.colors.pagination};
    }
  }
`;

export const ArrowWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 0.8rem;
  margin-left: 1.6rem;
  border-radius: 50%;
  border: 0;
  background-color: transparent;

  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const RightArrow = styled(MdKeyboardArrowRight)`
  color: ${props => props.theme.colors.pagination};
`;

export const LeftArrow = styled(MdKeyboardArrowLeft)`
  color: ${props => props.theme.colors.pagination};
`;
