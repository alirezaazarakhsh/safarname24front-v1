type CSSVars = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};

export type { CSSVars };
