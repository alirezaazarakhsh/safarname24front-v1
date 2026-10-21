import {
  Drawer,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
} from '@/components/ui/drawer';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { User } from 'lucide-react';
import { useMediaQuery } from '@/hooks';
import LogoutButton from './logout-button';

import { Label } from '@/components/ui/label';
import { User as TUser } from '@/types/general';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';
import { userOptions } from '@/config/constants/general';

type Props = {
  info: TUser;
};

// ---------------------------------

export default function UserInfo({ info }: Props) {
  const isMobile = useMediaQuery('(max-width: 640px)');

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger
          render={
            <Button variant="outline" size="icon-lg" className="rounded-full" />
          }
        >
          <User className="size-4.5" />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="gap-3 p-4">
            <DrawerTitle className="hidden"></DrawerTitle>
            <DrawerDescription className="hidden"></DrawerDescription>

            <Label>{info?.full_name ?? 'بدون نام'}</Label>

            <Label className="truncate pt-0">
              {info?.email ?? 'بدون ایمیل'}
            </Label>
          </DrawerHeader>

          <Separator />

          <DrawerFooter className="mt-4">
            {userOptions.map((item) => {
              const Icon = item.icon;

              return (
                <Button
                  key={item.id}
                  nativeButton={false}
                  variant={'secondary'}
                  className={
                    'h-12 w-full justify-start gap-2.5 [&_svg]:size-4.5!'
                  }
                >
                  <Icon />
                  <span>{item.label}</span>
                </Button>
              );
            })}

            <LogoutButton />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon-lg" className="rounded-full" />
        }
      >
        <User className="size-4.5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-48">
        <DropdownMenuGroup>
          <div className="grid gap-1.5 px-2.5 py-2">
            <DropdownMenuLabel className={'truncate p-0'}>
              {info?.full_name ?? 'بدون نام'}
            </DropdownMenuLabel>

            <DropdownMenuLabel className="truncate p-0">
              {info?.email ?? 'بدون ایمیل'}
            </DropdownMenuLabel>
          </div>

          <DropdownMenuSeparator />

          {userOptions.map((item) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem key={item.id}>
                <Icon />
                <span>{item.label}</span>
              </DropdownMenuItem>
            );
          })}

          <LogoutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
