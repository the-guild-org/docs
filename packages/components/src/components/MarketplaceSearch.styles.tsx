import tw, { styled } from 'twin.macro';

export const Wrapper = styled.section(() => [tw`bg-white dark:bg-gray-900 font-default`]);

export const Container = styled.div(() => [tw`container-max py-12`]);

export const Title = styled.h2(() => [
  tw`mt-0 mb-4 font-bold text-black dark:text-gray-50 text-2xl md:text-3xl`,
]);

export const Results = styled.div(() => [
  tw`flex flex-wrap lg:flex-nowrap -mx-6`,
]);
