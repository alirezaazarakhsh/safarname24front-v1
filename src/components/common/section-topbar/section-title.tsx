import { cn } from 'cn';

type Props = {
  className?: string;
  children: React.ReactNode;
};

// ------------------------------

export function SectionTitle(props: Props) {
  const { children, className } = props;

  return (
    <span
      className={cn(
        'inline-block text-[clamp(1rem,3vw,1.1rem)] font-extrabold',
        className,
      )}
    >
      {children}
    </span>
  );
}
