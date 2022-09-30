/* eslint-disable react/require-default-props */
import React from 'react';
import { MdOutlineStarHalf, MdStar, MdStarOutline } from 'react-icons/md';

import { StarType } from '../../models/Feedback';

import { Container } from './styles';

interface Props {
  starRating: StarType[];
  fullWidth?: boolean;
}

export const StarRating: React.FC<Props> = ({
  starRating,
  fullWidth = true,
}) => {
  function renderStar(type: StarType, key: number) {
    switch (type) {
      case StarType.empty:
        return <MdStarOutline color="#BEC0C2" key={key} />;
      case StarType.full:
        return <MdStar color="#FCB61A" key={key} />;
      case StarType.half:
      default:
        return <MdOutlineStarHalf color="#FCB61A" key={key} />;
    }
  }
  return (
    <Container fullWidth={fullWidth}>
      {starRating.map((type, index) => renderStar(type, index))}
    </Container>
  );
};
