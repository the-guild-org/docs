import { Meta, StoryObj } from '@storybook/react';
import tailwindConfig from '@theguild/tailwind-config';

export default {
  title: 'Design System/Color Palette',
} satisfies Meta;

export const ColorPalette: StoryObj = {
  render() {
    return (
      <div className="text-green-1000 dark:bg-green-1000 h-screen bg-white p-8 dark:text-white lg:p-16">
        <header className="flex flex-row items-center text-5xl tracking-[-0.288px]">
          <HiveIconMark className="mr-6" />
          <p>Core Elements</p>
          <ArrowRightIcon className="mx-4 font-medium" />
          <h1>Color Palette</h1>
          <p className="ml-auto text-sm leading-6 tracking-[-0.084px]">Hive</p>
        </header>
        <hr className="border-t-beige-200 my-6 border-t" />
      </div>
    );
  },
};

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HiveIconMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" {...props}>
      <rect width="80" height="80" rx="16" fill="url(#paint0_linear_630_754)" />
      <path
        d="M48.4021 19H31.5979L19 31.5979V48.4021L31.5979 61H48.4021L61 48.4021V31.5979L48.4021 19ZM58.3178 42.291L42.2894 58.3194C41.0244 59.5844 38.9739 59.5844 37.709 58.3194L21.6822 42.291C20.4172 41.0261 20.4172 38.9755 21.6822 37.7106L37.709 21.6822C38.9739 20.4172 41.0244 20.4172 42.2894 21.6822L58.3178 37.7106C59.5828 38.9755 59.5828 41.0261 58.3178 42.291Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_630_754"
          x1="40"
          y1="0"
          x2="40"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#217164" />
          <stop offset="1" stopColor="#08594E" />
        </linearGradient>
      </defs>
    </svg>
  );
}
