'use client';

import {
  Drawer,
  DrawerTitle,
  DrawerTrigger,
  DrawerContent,
} from '@/components/ui/drawer';

import {
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks';
import { usePassengersContext } from '@/context';

import PassengersContent from './PassengersContent';
import PassengersTrigger from './PassengersTrigger';

type CommonProps = {
  sideOffset?: number;
  triggerType?: 'home' | 'else';
  alignOffset?: number | undefined;
};

type Props =
  | ({
      scrollBehavior?: false;
    } & CommonProps)
  | ({
      scrollBehavior?: true;
      scrollPosition?: number;
    } & CommonProps);

// -----------------------------------

export default function Passengers(props: Props) {
  const {
    sideOffset,
    alignOffset,
    scrollBehavior,
    triggerType = 'else',
  } = props;

  const [isOpen, setOpen] = useState(false);
  const { confirmedPassengers } = usePassengersContext();
  const isDesktop = useMediaQuery('(min-width: 1024px)', true);

  return (
    <>
      {!isDesktop ? (
        <Drawer open={isOpen} onOpenChange={setOpen}>
          <DrawerTrigger className="bg-zinc-200/50 w-full text-zinc-600 text-cs08 font-semibold h-12 px-5 flex items-center rounded-cs-10">
            {confirmedPassengers.passengers ? (
              <div className="flex-center gap-1">
                <span>{confirmedPassengers.passengers}</span>
                <span>مسافر</span>
                <span className="inline-block -mx-0.5">,</span>
                <span>{confirmedPassengers.rooms}</span>
                <span>اتاق</span>
              </div>
            ) : (
              <span>تعداد مسافران</span>
            )}
          </DrawerTrigger>

          <DrawerContent aria-describedby={undefined} className="pb-6">
            <DrawerTitle className="hidden"></DrawerTitle>
            <PassengersContent handleClose={() => setOpen(false)} />
          </DrawerContent>
        </Drawer>
      ) : (
        <DropdownMenu
          dir="rtl"
          modal={false}
          open={isOpen}
          onOpenChange={setOpen}
        >
          <PassengersTrigger
            isOpen={isOpen}
            type={triggerType}
            scrollBehavior={scrollBehavior}
            handleSetOpen={() => setOpen(true)}
            scrollPosition={scrollBehavior ? props.scrollPosition : undefined}
          />

          <DropdownMenuContent
            align="start"
            side="bottom"
            sideOffset={sideOffset}
            avoidCollisions={false}
            alignOffset={alignOffset}
            className="w-[21rem] z-10 p-5 pl-4 rounded-xl shadow-[0_0.5rem_2rem_rgba(0,0,0,0.06)]"
          >
            <PassengersContent handleClose={() => setOpen(false)} />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
