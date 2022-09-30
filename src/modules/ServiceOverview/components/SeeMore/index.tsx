import React from 'react';
import Button from '../../../../components/atoms/Button';
import { SeeMoreWrapper } from './styles';

interface Props {
  onClick: () => void;
}

const SeeMore: React.FC<Props> = ({ onClick }) => {
  return (
    <SeeMoreWrapper>
      <Button text="Ver mais" onClick={() => onClick()} />
    </SeeMoreWrapper>
  );
};

export default SeeMore;
