import tw, { styled } from 'twin.macro';

export const Tag = styled.div(() => [
  tw`bg-gray-200 inline border-0 rounded-md cursor-pointer outline-none font-default text-xs text-gray-500 px-2 py-1 mr-2 mb-2`,
]);

export const TagsContainer = styled.div(() => [tw`py-2 flex flex-wrap`]);
