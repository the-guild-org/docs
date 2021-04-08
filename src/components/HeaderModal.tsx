import React, { useEffect } from "react";
import { HeaderModalProps } from "./types";
import { ModalHeader, ModalOverlay, ModalWrapper, ProductCategory, ProductThumbnail } from "./HeaderModal.styles";
import { headerThemedIcons } from "./Header.assets";

export const HeaderModal: React.FC<HeaderModalProps> = (props) => {
  const { darkTheme, modalOpen, setModalOpen } = props;
  const icons = headerThemedIcons(darkTheme);

  useEffect(() => {
    document.body.classList.toggle('blurred', modalOpen);
    return () => { document.body.classList.toggle('blurred', false); }
  });

  return (
    <ModalWrapper isModalOpen={modalOpen} role="dialog">
      <ModalOverlay tabIndex={-1}></ModalOverlay>
      <ModalHeader>
        <h2>Products by The Guild</h2>
        <button onClick={() => setModalOpen(false)}>
          <img src={icons.close} height="24" width="24" alt="Menu close icon" />
        </button>
      </ModalHeader>
      <ProductCategory>
        <h3>Category Name</h3>
        <ProductThumbnail>Item 1</ProductThumbnail>
        <ProductThumbnail>Item 2</ProductThumbnail>
      </ProductCategory>
      <ProductCategory>
        <h3>Category Name</h3>
        <ProductThumbnail>Item 1</ProductThumbnail>
      </ProductCategory>
    </ModalWrapper>
  );
};
