interface Props {
  msg: string;
  from?: string;
  to?: string;
}
export const Example = ({
  msg,
  from = 'rgba(25,152,97,1)',
  to = 'rgba(0,93,255,1)',
}: Props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(45deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <span
        style={{
          fontSize: '64px',
          color: 'filter: invert(100%) grayscale(100%) contrast(100)',
        }}
      >
        {msg}
      </span>
    </div>
  );
};
