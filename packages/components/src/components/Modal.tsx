import React, { useEffect } from 'react';
import FocusTrap from 'focus-trap-react';

import {
  Body,
  Container,
  CloseButton,
  Header,
  HeaderImage,
  HeaderInfo,
  Overlay,
  Wrapper,
} from './Modal.styles';

import { IModalProps } from '../types/components';
import { modalThemedIcons } from '../helpers/assets';
import { useThemeContext } from '../helpers/theme';
import { useKeyPress } from '../helpers/hooks';

export const Modal: React.FC<IModalProps> = ({
  image,
  title,
  description,
  children,
  visible,
  placement,
  onCancel,
  ...restProps
}) => {
  const { isDarkTheme } = useThemeContext();
  const escapePress = useKeyPress('Escape');
  const icons = modalThemedIcons(isDarkTheme || false);

  const renderDescription = () => {
    if (!description) {
      return;
    }

    if (typeof description === 'object') {
      return (
        <a {...description} {...restProps.headerLinkProps}>
          <p>{description.children}</p>
          <img src={icons.externalLink} height="15" width="15" alt="External" />
        </a>
      );
    } else {
      return <p {...restProps.headerDescriptionProps}>{description}</p>;
    }
  };

  useEffect(() => {
    if (visible && escapePress) {
      onCancel();
    }
  }, [visible, escapePress]);

  return (
    <Container isModalOpen={visible} {...restProps.containerProps}>
      <Overlay
        isModalOpen={visible}
        onClick={() => onCancel()}
        tabIndex={-1}
        {...restProps.overlayProps}
      />
      <FocusTrap
        active={visible}
        focusTrapOptions={{
          fallbackFocus: '#tgc-modal',
          clickOutsideDeactivates: true,
        }}
      >
        <Wrapper
          id="tgc-modal"
          tabIndex={-1}
          isModalOpen={visible}
          placement={placement}
          {...restProps.wrapperProps}
        >
          <Header>
            {image && (
              <HeaderImage {...image} {...restProps.headerImageProps} />
            )}
            <HeaderInfo>
              <h2 {...restProps.headerTitleProps}>{title}</h2>
              {renderDescription()}
            </HeaderInfo>
            <CloseButton onClick={() => onCancel()}>
              <img
                src={icons.close}
                height="22"
                width="22"
                alt="Modal close icon"
              />
            </CloseButton>
          </Header>
          <Body {...restProps.bodyProps}>{children}</Body>
        </Wrapper>
      </FocusTrap>
    </Container>
  );
};
