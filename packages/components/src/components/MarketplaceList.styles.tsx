import tw, { styled } from 'twin.macro';

export const Wrapper = styled.section(() => [
  tw`w-full bg-white dark:bg-gray-900 font-default`,
]);

export const Container = styled.div(() => [tw`container-max py-6`]);

export const Title = styled.h2(() => [
  tw`mt-0 mb-4 font-bold text-black dark:text-gray-50 text-xl md:text-2xl`,
]);

export const Placeholder = styled.div(() => [
  tw`flex items-center justify-center h-24 w-full text-black bg-gray-100 dark:(text-gray-300 bg-gray-700) rounded-lg`,
]);
