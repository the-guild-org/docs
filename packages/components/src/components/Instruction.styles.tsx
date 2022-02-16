import { css, styled, theme } from 'twin.macro';

export const Container = styled.div(() => css``);

export const Inner = styled.div(
  () => css`
    display: flex;
  `
);

export const Content = styled.div(
  () => css`
    position: relative;
    flex-grow: 1;
    padding-left: 15px;

    font-size: 16px;
    color: ${theme`colors.dark-blue`};

    &::before {
      top: 15px;
      position: absolute;
      content: '';
      left: -7px;
      border-radius: 2px;
      width: 4px;
      background-color: ${theme`colors.dark-blue`};
      height: 100%;
    }
  `
);

export const UpperLine = styled.div(
  () => css`
    height: 16px;
    position: relative;
    margin-bottom: 5px;

    &::before {
      position: absolute;
      content: '';
      left: 3px;
      border-radius: 2px;
      width: 4px;
      background-color: ${theme`colors.dark-blue`};
      height: 100%;
    }
  `
);

export const SingleDot = styled.div(
  () => css`
    height: 10px;
    position: relative;
    width: 10px;

    &::before {
      position: absolute;
      left: 0;
      background-color: ${theme`colors.dark-blue`};
      top: 0;
      width: 10px;
      height: 10px;
      content: '';
      border-radius: 100%;
    }
  `
);
