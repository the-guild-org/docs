import tw, { css, styled } from 'twin.macro';

interface themeProps {
  isModalOpen?: boolean
}

export const ModalWrapper = styled.div(({ isModalOpen }: themeProps) => [
  tw`hidden`,
  isModalOpen && tw`block`
]);

export const ModalOverlay = styled.div(() => []);
export const ModalHeader = styled.div(() => []);
export const ModalContent = styled.div(() => []);
export const ProductCategory = styled.div(() => []);
export const ProductThumbnail = styled.div(() => []);