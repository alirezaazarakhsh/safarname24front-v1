import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { SOCIAL_MEDIA } from '@/lib/constants/general';

// ------------------------------

export function SocialMedia() {
  return (
    <div className="space-y-4">
      <span className="inline-block text-sm font-semibold">
        شبکه های اجتماعی :
      </span>

      <div className="flex flex-wrap gap-3">
        {SOCIAL_MEDIA?.map(
          (item) =>
            item.href && (
              <Tooltip key={item.type}>
                <TooltipTrigger
                  render={
                    <Button
                      variant="secondary"
                      nativeButton={false}
                      className="size-12 rounded-xl p-2"
                      render={
                        <Link target="_blank" href={item.href}>
                          {item.image && (
                            <Image
                              alt={item.image.alt}
                              src={item.image.src}
                              className="size-full"
                            />
                          )}
                        </Link>
                      }
                    />
                  }
                />

                <TooltipContent className="capitalize">
                  {item.label.fa}
                </TooltipContent>
              </Tooltip>
            ),
        )}
      </div>
    </div>
  );
}
