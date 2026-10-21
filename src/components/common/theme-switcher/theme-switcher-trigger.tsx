import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = React.ComponentProps<typeof Button>;

// ------------------------------

export default function ThemeSwitcherTrigger({ className, ...props }: Props) {
  return (
    <Button
      size="icon-lg"
      variant="outline"
      className={cn('rounded-full', className)}
      {...props}
    >
      <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
