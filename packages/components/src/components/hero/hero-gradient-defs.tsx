import { GRADIENT_GREEN_ID, GRADIENT_WHITE_2_ID, GRADIENT_WHITE_ID } from './hero-gradient-ids';

export function HeroGradientDefs() {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={GRADIENT_GREEN_ID}
          x1="0"
          y1="0"
          x2="96"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3B736A" />
          <stop offset="1" stopColor="#15433C" />
        </linearGradient>
        <linearGradient
          id={GRADIENT_WHITE_ID}
          x1="0"
          y1="0"
          x2="96"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient
          id={GRADIENT_WHITE_2_ID}
          x1="1"
          y1="2"
          x2="161"
          y2="171"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.1" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
