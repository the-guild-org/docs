import tw, {css, styled} from 'twin.macro';

export const Wrapper = styled.section(() => []);

export const Container = styled.div(() => []);

export const Title = styled.h2(() => [
  tw`mt-0 mb-4 font-bold text-black dark:text-gray-50 text-2xl md:text-3xl`,
]);

export const Examples = styled.div(() => [
    tw`flex flex-wrap lg:flex-nowrap gap-8`,
]);
