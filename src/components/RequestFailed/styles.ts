import styled from 'styled-components';
import { HiOutlineEmojiSad } from 'react-icons/hi';

interface ContainerProps {
  minHeight: number;
}

export const Container = styled.div<ContainerProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${props => props.minHeight}rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 3.8rem;
  line-height: 4rem;
  color: ${props => props.theme.colors.description};
`;

export const SubtitleWrapper = styled.div`
  margin-top: 2.6rem;

  span.failed,
  span.knowledge {
    font-size: 1.6rem;
    line-height: 4rem;
  }

  span.failed {
    color: ${props => props.theme.colors.shadow};
  }
  span.knowledge {
    color: ${props => props.theme.colors.description};
  }
`;

export const IconWrapper = styled.div`
  @media (min-width: 680px) {
    display: none;
  }
  @media (min-width: 680.01px) {
    display: block;
  }
  display: block;
  width: 30%;
  height: 100%;
`;

export const SadEmoji = styled(HiOutlineEmojiSad)`
  font-size: 30rem;
  color: ${props => props.theme.colors.description};
`;
