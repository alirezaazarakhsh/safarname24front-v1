import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Info } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// ------------------------------

export function Newsletter() {
  return (
    <div className="md:space-y-4">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger className={'hidden md:block'}>
            <Info className="text-muted-foreground size-4" />
          </TooltipTrigger>

          <TooltipContent className="capitalize">
            با ثبت ایمیل، اولین نفر از تخفیف ها باخبر شوید .
          </TooltipContent>
        </Tooltip>

        <span className="inline-block text-sm font-semibold">
          عضویت در خبرنامه :
        </span>
      </div>

      <p className="text-muted-foreground mt-2 mb-5 text-sm font-medium md:hidden">
        با ثبت ایمیل، اولین نفر از تخفیف ها باخبر شوید .
      </p>

      <form action="">
        <div className="flex w-full max-w-sm">
          <Input
            className="rounded-e-none"
            placeholder="ایمیل خود را وارد کنید"
          />

          <Button className={'rounded-s-none px-5 sm:px-6'}>
            <span>عضویت</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
