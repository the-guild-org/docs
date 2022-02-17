import React from 'react';
import {
  Container,
  UpperLine,
  SingleDot,
  Inner,
  Content,
} from './Instruction.styles';

type InstructionProps = {
  children: React.ReactChild;
};

export const Instruction = (props: InstructionProps): React.ReactElement => {
  return (
    <Container>
      <UpperLine />
      <Inner>
        <SingleDot />
        <Content>{props.children}</Content>
      </Inner>
    </Container>
  );
};
