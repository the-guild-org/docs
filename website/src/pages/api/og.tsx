import { ComponentProps } from 'react';
import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { PRODUCTS } from '@theguild/components/products';

export const config = {
  runtime: 'experimental-edge',
};

const products = Object.fromEntries(PRODUCTS.map(({ children, ...product }) => [children, product]));

const englishJoinWords = words => new Intl.ListFormat('en-US', { type: 'disjunction' }).format(words);

const ALLOWED_PRODUCT_NAMES = englishJoinWords(Object.keys(products));

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const title = searchParams.get('title')?.slice(0, 100) || 'My default title';
    const productName = searchParams.get('product');
    const product = productName && products[productName];
    if (!product) {
      throw new Error(`Unknown product name "${productName}".\nAllowed product names: ${ALLOWED_PRODUCT_NAMES}`);
    }

    return new ImageResponse(
      (
        <div tw="flex bg-neutral-900 h-full flex-col w-full items-center justify-center">
          <LeftCircle tw="absolute left-0 top-0" />
          <RightCircle tw="absolute right-0" />
          <RightSmallCircle tw="absolute right-0" />
          <product.logo tw="w-32 h-32" />
          <span tw="font-bold text-7xl text-white">{title}</span>
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
              <span tw="text-indigo-600">Start your free trial today.</span>
            </h2>
            <div tw="mt-8 flex md:mt-0">
              <div tw="flex rounded-md shadow">
                <a
                  href="#"
                  tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white"
                >
                  Get started
                </a>
              </div>
              <div tw="ml-3 flex rounded-md shadow">
                <a
                  href="#"
                  tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    );
  } catch (e) {
    return new Response(`Failed to generate the image.\n\nError: ${(e as Error).message}`, { status: 500 });
  }
}

const RightSmallCircle = (props: ComponentProps<'svg'>) => {
  return (
    <svg width="310" height="316" viewBox="0 0 310 316" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#filter0_b_1686_12556)">
        <circle cx="158" cy="158" r="158" fill="url(#paint0_linear_1686_12556)" fillOpacity="0.4" />
        <circle cx="158" cy="158" r="156" stroke="url(#paint1_linear_1686_12556)" strokeWidth="4" />
      </g>
      <defs>
        <filter
          id="filter0_b_1686_12556"
          x="-94"
          y="-94"
          width="504"
          height="504"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="47" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1686_12556" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1686_12556" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_1686_12556"
          x1="124.485"
          y1="131.667"
          x2="345.661"
          y2="295.327"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F25C40" />
          <stop offset="1" stopColor="#FF9E57" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1686_12556"
          x1="124.485"
          y1="131.667"
          x2="158"
          y2="267.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F25C40" />
          <stop offset="1" stopColor="#FF9E57" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const RightCircle = (props: ComponentProps<'svg'>) => {
  return (
    <svg width="205" height="616" viewBox="0 0 205 616" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="308" cy="308" r="308" fill="url(#paint0_linear_1686_12554)" />
      <defs>
        <linearGradient
          id="paint0_linear_1686_12554"
          x1="0"
          y1="0"
          x2="742.578"
          y2="337.493"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7433FF" />
          <stop offset="1" stopColor="#FFA3FD" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const LeftCircle = (props: ComponentProps<'svg'>) => {
  return (
    <svg width="572" height="584" viewBox="0 0 572 584" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g opacity="0.4" filter="url(#filter0_f_2101_15208)">
        <circle cx="70" cy="81.9999" r="308" fill="url(#paint0_linear_2101_15208)" />
      </g>
      <circle cx="48" cy="17" r="308" transform="rotate(-57.2911 48 17)" fill="url(#paint1_linear_2101_15208)" />
      <defs>
        <filter
          id="filter0_f_2101_15208"
          x="-432"
          y="-420"
          width="1004"
          height="1004"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="97" result="effect1_foregroundBlur_2101_15208" />
        </filter>
        <linearGradient
          id="paint0_linear_2101_15208"
          x1="-307.41"
          y1="-247.818"
          x2="617.862"
          y2="682.861"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#47DEFF" />
          <stop offset="1" stopColor="#9847FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2101_15208"
          x1="-230.791"
          y1="17.773"
          x2="659.231"
          y2="554.86"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1CC8EE" />
          <stop offset="1" stopColor="#9847FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
