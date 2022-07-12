declare module 'nextra-theme-docs/callout' {
  export default function Callout(): any;
}

declare module 'nextra-theme-docs/tabs' {
  export function Tabs(props: { children: ReactNode; items: string[] | ReadonlyArray<string> }): ReactElement;

  export function Tab(props: { children: ReactNode }): ReactElement;
}
