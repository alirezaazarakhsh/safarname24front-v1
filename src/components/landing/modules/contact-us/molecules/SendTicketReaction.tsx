'use client';

import { useMediaQuery } from '@/hooks';
import { sendTicketReaction } from '@/constants';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle } from '@/components/ui/drawer';

type Props = {
  isOpen: boolean;
  reactionType: 'success' | 'fail';
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// ---------------------------------------

export default function SendTicketReaction(props: Props) {
  const { isOpen, setOpen, reactionType } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const content = reactionType === 'success' ? sendTicketReaction.success : sendTicketReaction.fail;

  return (
    <>
      {isDesktop ? (
        <>
          {/* Dialog (Large-Device) */}
          <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className='max-w-[450px] text-cs08 font-semibold gap-0'>
              <DialogTitle className='text-zinc-800 text-base font-extrabold'>{content.title}</DialogTitle>

              <DialogDescription className='text-zinc-500 mt-3 mb-6 flex flex-col'>
                <span>مشترک گرامی عزیز</span>
                <span>{content.desc}</span>
              </DialogDescription>

              <DialogClose
                className={`w-max h-10 text-zinc-100 px-6 rounded-lg ${
                  reactionType === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              >
                {reactionType === 'success' ? 'متوجه شدم' : 'تلاش مجدد'}
              </DialogClose>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          {/* Drawer (Small-Device) */}
          <Drawer open={isOpen} onOpenChange={setOpen}>
            <DrawerContent className='text-cs08 font-semibold'>
              <DrawerTitle className='text-zinc-800 text-cs09 font-extrabold'>{content.title}</DrawerTitle>

              <DrawerDescription className='text-zinc-500 mt-3 mb-5 flex flex-col'>
                <span>مشترک گرامی عزیز</span>
                <span>{content.desc}</span>
              </DrawerDescription>

              <DrawerClose
                className={`w-max h-10 text-zinc-100 px-6 rounded-lg ${
                  reactionType === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {reactionType === 'success' ? 'متوجه شدم' : 'تلاش مجدد'}
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
