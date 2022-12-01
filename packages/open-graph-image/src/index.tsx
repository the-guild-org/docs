/* eslint react/no-unknown-property: ['error', { ignore: ['tw'] }] */
import { ComponentProps } from 'react';
import { PRODUCTS } from '@theguild/components/products';
import { GuildLogo, TheGuild } from '@theguild/components/logos';
import { generateImage } from './lib/img';

const { WHATSAPP, HELIX, STENCIL, ...filteredProducts } = PRODUCTS;

const products = {
  ...filteredProducts,
  GUILD: {
    name: 'The Guild',
    logo: GuildLogo,
    primaryColor: undefined,
  },
};

const englishJoinWords = (words: string[]): string =>
  new Intl.ListFormat('en-US', { type: 'disjunction' }).format(words);

const ALLOWED_PRODUCT_NAMES = englishJoinWords(Object.keys(products));

async function handler(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const productName = searchParams.get('product') as keyof typeof products | null;
    const product = productName && products[productName];

    if (!product) {
      throw new Error(
        `Unknown product name "${productName}".\nAllowed product names: ${ALLOWED_PRODUCT_NAMES}`,
      );
    }
    // ?title=<title>
    const title = searchParams.get('title')?.slice(0, 100);
    const extra = searchParams.get('extra');
    const IS_GUILD = productName === 'GUILD';

    return new Response(
      await generateImage(
        <div tw="flex bg-neutral-900 h-full flex-col w-full items-center justify-center">
          <LeftCircle tw="absolute left-0 top-0" color={product.primaryColor} />
          <RightCircle tw="absolute right-0" color={product.primaryColor} />
          <RightSmallCircle
            tw="absolute right-0 opacity-80"
            color={shade(product.primaryColor || '', 100)}
          />
          <product.logo style={{ transform: 'scale(2.5)' }} {...(IS_GUILD && { fill: 'white' })} />
          <span tw="font-bold text-7xl text-white my-14 mb-10">{product.name}</span>
          {title && <span tw="font-bold text-5xl text-white mb-4">{title}</span>}
          {extra && <span tw="font-bold text-2xl text-white">{extra}</span>}
          {!IS_GUILD && (
            <div tw="flex items-center mt-14">
              {/* @ts-expect-error -- using `tw` is valid with satori */}
              <GuildLogo fill="#fff" tw="mr-1.5" />
              <TheGuild fill="#fff" />
            </div>
          )}
        </div>,
      ),
      {
        headers: {
          'Content-Type': 'image/png',
        },
      },
    );
  } catch (e) {
    return new Response(`Failed to generate the image.\n\nError: ${(e as Error).message}`, {
      status: 500,
    });
  }
}

export default {
  async fetch(request: Request, _env: unknown, ctx: ExecutionContext) {
    const cacheUrl = new URL(request.url);

    // Construct the cache key from the cache URL
    const cacheKey = new Request(cacheUrl.toString(), request);
    const cache = caches.default;

    let response = await cache.match(cacheKey);

    if (!response) {
      // If not in cache, get it from origin
      response = await handler(request);

      // Must use Response constructor to inherit all of response's fields
      response = new Response(response.body, response);

      // Cache API respects Cache-Control headers. Setting s-max-age to 10
      // will limit the response to be in cache for 30 minutes max

      // Any changes made to the response here will be reflected in the cached value
      response.headers.append('Cache-Control', 'public');
      response.headers.append('Cache-Control', 's-maxage=1800');
      response.headers.append('Cache-Control', 'max-age=1800');

      // Store the fetched response as cacheKey
      // Use `waitUntil`, so you can return the response without blocking on
      // writing to cache
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    }
    return response;
  },
};

function shade(color: string, amount: number): string | undefined {
  if (!color) {
    return;
  }

  let result = '';

  if (color[0] == '#') {
    color = color.slice(1);
    result = '#';
  }

  const num = parseInt(color, 16);

  let r = (num >> 16) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amount;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return result + (g | (b << 8) | (r << 16)).toString(16);
}

type CircleProps = ComponentProps<'svg'> & { color?: string; tw?: string };

const RightSmallCircle = ({ color = '#f25c40', ...props }: CircleProps) => {
  return (
    <svg
      width="310"
      height="316"
      viewBox="0 0 310 316"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
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
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1686_12556"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1686_12556"
          x1="124.485"
          y1="131.667"
          x2="345.661"
          y2="295.327"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={shade(color, -50)} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1686_12556"
          x1="124.485"
          y1="131.667"
          x2="158"
          y2="267.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={shade(color, -50)} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const RightCircle = ({ color = '#7433ff', ...props }: CircleProps) => {
  return (
    <svg
      width="205"
      height="616"
      viewBox="0 0 205 616"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
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
          <stop stopColor={shade(color, -50)} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
      </defs>
    </svg>
  );
};

const LeftCircle = ({ color = '#1cc8ee', ...props }: CircleProps) => {
  return (
    <svg
      width="572"
      height="584"
      viewBox="0 0 572 584"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.4" filter="url(#filter0_f_2101_15208)">
        <circle cx="70" cy="81.9999" r="308" fill="url(#paint0_linear_2101_15208)" />
      </g>
      <circle
        cx="48"
        cy="17"
        r="308"
        transform="rotate(-57.2911 48 17)"
        fill="url(#paint1_linear_2101_15208)"
      />
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
          <stop stopColor={shade(color, 50)} />
          <stop offset="1" stopColor={shade(color, 100)} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2101_15208"
          x1="-230.791"
          y1="17.773"
          x2="659.231"
          y2="554.86"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={shade(color, 100)} />
        </linearGradient>
      </defs>
    </svg>
  );
};
