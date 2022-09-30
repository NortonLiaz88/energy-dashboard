import React from 'react';
import { CgExpand } from 'react-icons/cg';

import theme from '../../../styles/theme';

import { ButtonWrapper } from './styles';

export interface ButtonProps {
  onClick(): void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }: ButtonProps) => {
  return (
    <ButtonWrapper onClick={onClick}>
      {text}
      <CgExpand style={{ color: theme.colors.shape }} size="2.4rem" />
    </ButtonWrapper>
  );
};

export default Button;
