import { ReactNode } from 'react';

import {
  Backdrop,
  ChildrenWrapper,
  CloseButton,
  Content,
  Header,
} from './styles';

interface Props {
  children: ReactNode;
  title: string;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ children, title, onClose }) => {
  return (
    <Backdrop>
      <Content>
        <Header>
          <h1>{title}</h1>
          <CloseButton onClick={() => onClose()} />
        </Header>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Content>
    </Backdrop>
  );
};
