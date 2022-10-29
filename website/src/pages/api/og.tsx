import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const BlueCircle = () => {
  return (
    <svg width="572" height="584" viewBox="0 0 572 584" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const title = searchParams.get('title')?.slice(0, 100) || 'My default title';

    return new ImageResponse(
      (
        <div tw="max-w-[900px] flex">
          <BlueCircle />
          {/*<Image*/}
          {/*  alt=""*/}
          {/*  src={blueCircle}*/}
          {/*  placeholder="empty"*/}
          {/*  loading="eager"*/}
          {/*  tw="absolute top-0 -left-40 z-[-1] lg:left-0"*/}
          {/*/>*/}
          <div tw="bg-gray-50 flex">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span>{title}</span>
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
        </div>
      )
    );
  } catch (e) {
    console.log(`${(e as Error).message}`);
    return new Response('Failed to generate the image', { status: 500 });
  }
}
