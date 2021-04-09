import React, { useEffect } from "react";
import { HeaderModalProps } from "./types";
import { HeaderIcon } from './Header.styles';
import { Modal, ModalContent, ModalHeader, ModalOverlay, ModalWrapper, ProductCategory, ProductList, ProductThumbnail } from "./HeaderModal.styles";
import { headerThemedIcons, productThemedIcons } from "./Header.assets";

export const HeaderModal: React.FC<HeaderModalProps> = (props) => {
  const { darkTheme, modalOpen, setModalOpen } = props;
  const icons = headerThemedIcons(darkTheme);
  const productIcons = productThemedIcons();

  const productCategories = [{
    title: "Category Name or tags or poplarity",
    items: [{
      title: "Envelop",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.envelop
    }, {
      title: "Hive",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.hive
    }, {
      title: "Inspector",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.inspector
    }, {
      title: "Code Generator",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.codeGen
    }, {
      title: "CLI",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.cli
    }, {
      title: "Scalars",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.scalars
    }]
  },
  {
    title: "Category Name or tags or poplarity",
    items: [{
      title: "Mesh",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.mesh
    }, {
      title: "Modules",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.modules
    }, {
      title: "Tools",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.tools
    }, {
      title: "Sofa",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.sofa
    }, {
      title: "Angular",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.angular
    }, {
      title: "Config",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.config
    }, {
      title: "Whatsapp",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.whatsapp
    }, {
      title: "Stencil",
      description: "Modern GraphQL Framework",
      link: "#",
      image: productIcons.stencil
    }]
  }]

  useEffect(() => {
    document.body.classList.toggle('blurred', modalOpen);
    return () => { document.body.classList.toggle('blurred', false); }
  });

  return (
    <Modal isModalOpen={modalOpen}>
      <ModalOverlay tabIndex={-1}></ModalOverlay>
      <ModalWrapper isDark={darkTheme} role="dialog">
        <ModalHeader isDark={darkTheme}>
          <h2>Products by The Guild</h2>
          <HeaderIcon iconType="close" onClick={() => setModalOpen(false)}>
            <img src={icons.close} height="24" width="24" alt="Menu close icon" />
          </HeaderIcon>
        </ModalHeader>
        <ModalContent isDark={darkTheme}>
          {productCategories.map((category, index) => (
            <ProductCategory key={index} isDark={darkTheme}>
              <h3>{category.title}</h3>
              <ProductList>
                {category.items.map(product => (
                  <ProductThumbnail key={product.title} href={product.link} isDark={darkTheme}>
                    <img src={product.image} alt={`${product.title} logo`} />
                    <span>
                      <h4>{product.title}</h4>
                      <p>{product.description}</p>
                    </span>
                  </ProductThumbnail>
                ))}
              </ProductList>
            </ProductCategory>
          ))}
        </ModalContent>
      </ModalWrapper>
    </Modal>
  );
};
