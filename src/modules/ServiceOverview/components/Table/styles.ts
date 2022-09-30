import {
  AiOutlineArrowUp,
  AiOutlineLine,
  AiOutlineArrowDown,
} from 'react-icons/ai';
import { MdStar } from 'react-icons/md';
import styled from 'styled-components';

export const TableWrapper = styled.div`
  margin-top: 0.8rem;
`;

export const Table = styled.table`
  border: 0px;
  border-spacing: 0 1em;
  width: 100%;
`;

export const TableHead = styled.thead``;

export const TableHeaderRow = styled.tr``;

export const TableHeaderWrapper = styled.div`
  display: table-cell;
`;

export const TableHeader = styled.th`
  /* border: 1px solid #999; */
  cursor: pointer;
  padding: 0.5rem;
  text-align: left;

  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.8rem;

  color: ${({ theme }) => theme.colors.tableHeader};

  margin-right: 8.4rem;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  background: #f7f7f7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 0.8rem;
`;

export const TableData = styled.td`
  &:nth-child(1) {
    border-left: 0.4rem solid ${({ theme }) => theme.colors.success};
  }
  /* border: 1px solid #999; */
  padding: 1rem;
  margin: 0.5rem;

  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 4rem;
  max-width: 20rem;
`;

export const FeedbackText = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const UpOrderIcon = styled(AiOutlineArrowUp).attrs({
  size: '2.5rem',
})`
  line-height: 2.5rem;
  vertical-align: middle;
  margin-left: 0.8rem;
  cursor: pointer;
`;

export const DowOrderIcon = styled(AiOutlineArrowDown).attrs({
  size: '2.5rem',
})`
  line-height: 2.5rem;
  vertical-align: middle;
  margin-left: 0.8rem;
  cursor: pointer;
`;

export const DefaultOderIcon = styled(AiOutlineLine).attrs({
  size: '2.5rem',
})`
  line-height: 2.5rem;
  vertical-align: middle;
  margin-left: 0.8rem;
  cursor: pointer;
`;

export const StartIcon = styled(MdStar).attrs({
  size: '1.6rem',
})``;

export const RelatedProblem = styled.p`
  text-transform: capitalize;
`;
