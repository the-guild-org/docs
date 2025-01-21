import { cloneElement, ComponentProps, FC, ReactElement, ReactNode, useId } from 'react'
import { cn } from '../../cn'
import { DecorationIsolation } from '../decorations'
import { Heading } from '../heading'
import { CheckIcon } from '../icons'

export const Hero: FC<{
  className?: string;
  heading: string;
  text: string;
  checkmarks: string[];
  logo: ReactElement<ComponentProps<'svg'>>;
  children?: ReactNode;
}> = (props) => {
  const gradientWhiteId = useId();
  const gradientWhiteId2 = useId();
  const greenBgId = useId();

  return (
    <div
      className={cn(
        'mx-4 max-sm:mt-2 md:mx-6 relative isolate flex max-w-[90rem] flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl bg-blue-400 px-4 py-6 sm:py-12 md:gap-8 lg:py-24',
        props.className
      )}
    >
      <DecorationIsolation className="-z-10">
        {cloneElement(props.logo, {
          className: cn(
            'absolute stroke-white/10 max-lg:hidden',
            '-left-1/2 top-1/2 -translate-y-1/2'
          ),
          fill: `url(#${gradientWhiteId2})`,
          strokeWidth: '0.1',
          width: 'auto',
          height: '50%',
        })}
        {cloneElement(props.logo, {
          className: cn(
            'absolute top-1/2 -translate-y-1/2 stroke-white/10',
            '-right-1/2 lg:-right-1/3',
            'h-2/3 lg:h-[calc(100%-5%)]'
          ),
          fill: `url(#${gradientWhiteId2})`,
          strokeWidth: '0.1',
          width: 'auto',
        })}
      </DecorationIsolation>
      <div className="relative">
        {cloneElement(props.logo, {
          fill: `url(#${gradientWhiteId})`,
          className:
            'absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 size-1/2',
        })}
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="96" height="96" rx="24" fill={`url(#${greenBgId})`} />
          <rect
            x="0.5"
            y="0.5"
            width="95"
            height="95"
            rx="23.5"
            stroke={`url(#${gradientWhiteId})`}
          />
          <path d="M57.0264 32.1652H48.9577L53.8032 27.3197L48.4855 22L43.1658 27.3197L48.0114 32.1652H39.9427C38.9042 32.1652 37.9069 32.5786 37.1721 33.3134L23 47.4855L28.3197 52.8052L45.715 35.4099C47.2452 33.8797 49.7258 33.8797 51.2561 35.4099L68.6513 52.8052L73.971 47.4855L59.797 33.3114C59.0622 32.5767 58.0649 32.1632 57.0264 32.1632V32.1652ZM48.4854 63.3623L43.1665 68.6811L48.4854 74L53.8042 68.6811L48.4854 63.3623ZM39.9446 52.8054H48.4855H48.4894H57.0303C58.0688 52.8054 59.0661 53.2188 59.8008 53.9536L63.89 58.0428L58.5704 63.3625L51.258 56.0501C49.7277 54.5198 47.2472 54.5198 45.7169 56.0501L38.4045 63.3625L33.0848 58.0428L37.174 53.9536C37.9088 53.2188 38.9061 52.8054 39.9446 52.8054Z" />
          <defs>
            <linearGradient
              id={greenBgId}
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
              id={gradientWhiteId}
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
              id={gradientWhiteId2}
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
      </div>
      <Heading
        as="h1"
        size="xl"
        className="mx-auto max-w-3xl text-balance text-center"
      >
        {props.heading}
      </Heading>
      <p className="mx-auto w-[512px] max-w-[80%] text-center leading-6 text-green-800">
        {props.text}
      </p>
      <ul className="mx-auto flex list-none gap-x-6 gap-y-2 text-sm font-medium max-md:flex-col [&>li]:flex [&>li]:items-center [&>li]:gap-2">
        {props.checkmarks.map((text) => (
          <li key={text}>
            <CheckIcon className="text-green-800" />
            {text}
          </li>
        ))}
      </ul>
      <div className="relative z-10 flex justify-center gap-2 px-0.5 max-sm:flex-col sm:gap-4">
        {props.children}
      </div>
    </div>
  );
};
