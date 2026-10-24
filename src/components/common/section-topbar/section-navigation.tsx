import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
  className?: string;
  nextSlide: () => void;
  prevSlide: () => void;
};

// ------------------------------

export function SectionNavigation(props: Props) {
  const { className, nextSlide, prevSlide } = props;

  return (
    <div className={cn('flex gap-2.5', className)}>
      <Button size={'icon-lg'} onClick={prevSlide}>
        <ArrowRight />
      </Button>

      <Button size={'icon-lg'} onClick={nextSlide}>
        <ArrowLeft />
      </Button>
    </div>
  );
}
