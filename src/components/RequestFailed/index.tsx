/* eslint-disable react/require-default-props */
import React from 'react';
import {
  Container,
  IconWrapper,
  TextWrapper,
  SubtitleWrapper,
  Title,
  SadEmoji,
} from './styles';

interface Props {
  minHeight: number;
  enableEmoji?: boolean;
}

export const RequestFailed: React.FC<Props> = ({
  minHeight = 35,
  enableEmoji = false,
}) => {
  return (
    <Container minHeight={minHeight}>
      <TextWrapper>
        <Title>Interface com defeito</Title>
        <SubtitleWrapper>
          <span className="failed">
            <strong>Falha</strong> na coleta de dados com o servidor.
          </span>
          <span className="knowledge"> Isso é tudo que sabemos</span>
        </SubtitleWrapper>
      </TextWrapper>
      {enableEmoji && (
        <IconWrapper>
          <SadEmoji />
        </IconWrapper>
      )}
    </Container>
  );
};
