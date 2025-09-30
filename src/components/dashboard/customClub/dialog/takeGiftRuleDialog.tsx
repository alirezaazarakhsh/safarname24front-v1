// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogPortal,
} from '@/components/ui/dialog';
import { TakeGiftRuleDialogPropsType } from '@/types/dashboard/component';
import { useMediaQuery } from '@/hooks';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ICX } from '@/components/icons/ICX';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Label } from '@radix-ui/react-label';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import Loading from '../../ui/loading';
import useCustomerClubPoints from '@/hooks/dashboard/useCustomerClubPoints';

// Creating and exporting TakeGiftRuleDialog component as default
export default function TakeGiftRuleDialog({
  closeFn,
  isOpened = false,
  setGiftGainedDialogOpened,
  setGiftGainErrorDialogOpened,
  refetch,
  rules,
  code,
  type,
}: TakeGiftRuleDialogPropsType): ReactNode {
  // Defining hooks
  const [rulesAccepted, setRulesAccepted] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const customerClubPoints = useCustomerClubPoints();

  // Fetching data
  const fetchData = useApiMutation({
    url: '/crm/activate-discount/',
    method: 'post',
    options: {
      onError: () => {
        closeFn && closeFn();
        setGiftGainErrorDialogOpened(true);
      },
      onSuccess: () => {
        closeFn && closeFn();
        refetch && refetch();

        customerClubPoints.refetch && customerClubPoints.refetch();
        setGiftGainedDialogOpened(true);
      },
    },
  });

  // Using useEffect to reset the state of component when dialog closes
  useEffect(() => {
    if (!isOpened) {
      setRulesAccepted(false);
    }
  }, [isOpened]);

  // Conditional rendering
  if (isMobile) {
    return (
      <Drawer open={isOpened} onClose={closeFn}>
        <DrawerContent>
          <DrawerHeader className="px-[24px] py-0 mb-[10px]">
            <div className="flex items-center justify-start gap-2">
              <IconsaxIcons
                name="Star1"
                color="currentColor"
                className="w-4 h-4 shrink-0"
              />
              <DrawerTitle className="text-[14px] font-bold text-black truncate block text-right">
                قوانین دریافت جایزه
              </DrawerTitle>
            </div>
          </DrawerHeader>
          <div className="px-[24px] py-0 mb-6">
            <div className="w-full overflow-hidden mb-4">
              <DialogDescription className="text-right text-[12px] font-medium leading-6 text-gray-500 break-all whitespace-normal w-full">
                {rules
                  ? rules
                  : 'لورم اپیسوم یک متن ساختگی است که در فناوری های تکنو بسیار از بقیه رقبا جلوتر و همچنین با کیفیت برخوردار است که یکی از لایقان آن زمین'}
              </DialogDescription>
            </div>
            <div
              className="flex items-center justify-start gap-[10px] overflow-hidden"
              onClick={() => setRulesAccepted((prev) => !prev)}
            >
              <div className="relative shrink-0 w-[21px] h-[21px]">
                <Checkbox
                  data-state={rulesAccepted ? 'checked' : 'unchecked'}
                  className="data-[state='unchecked']:bg-gray-100 lg:rounded-md rounded-[4px] w-[21px] h-[21px] aspect-square data-[state='checked']:bg-green-500 transition-all duration-500 peer cursor-pointer"
                />
                <IconsaxIcons
                  name="TickSquare"
                  variant="Bold"
                  color="white"
                  className="w-[12px] h-[12px] aspect-square absolute top-[50%] left-[50%] block -translate-y-[50%] -translate-x-[50%] peer-data-[state=unchecked]:opacity-0 peer-data-[state=checked]:opacity-100 pointer-events-none"
                />
              </div>
              <Label className="truncate block text-right w-full lg:text-cs08 text-[12px] lg:font-medium font-semibold text-black cursor-pointer">
                قوانین و مقرارت مطالعه کردم
              </Label>
            </div>
          </div>
          <DrawerFooter className="px-[24px] py-0 mt-[10px]">
            <DrawerClose asChild>
              <button
                className="px-[50px] h-[43px] flex items-center justify-center bg-green-600 rounded-[8px] w-full disabled:bg-gray-100 duration-500 transition-all"
                disabled={fetchData.isPending || !rulesAccepted}
                onClick={async () => {
                  await fetchData.mutateAsync({
                    code: code,
                    discount_type: type === 'room' ? 'room' : 'shopping_center',
                  });
                  setRulesAccepted(false);
                }}
              >
                {fetchData.isPending ? (
                  <Loading className="bg-black" />
                ) : (
                  <span className="text-[12px] font-semibold text-white">
                    دریافت جایزه
                  </span>
                )}
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpened}>
        <DialogPortal>
          <DialogContent className="lg:w-[500px] w-[calc(100vw-25px)] p-0 overflow-hidden">
            <div className="flex items-center justify-between gap-3 w-full border-b border-b-black/10 p-6">
              <div className="flex items-center justify-between gap-3">
                <IconsaxIcons
                  name="Star1"
                  color="currentColor"
                  className="w-4 h-4 shrink-0"
                />
                <DialogTitle className="text-right text-[14px] font-bold text-black">
                  قوانین دریافت جایزه
                </DialogTitle>
              </div>
              <DialogClose asChild>
                <button onClick={closeFn}>
                  <ICX className="w-3 h-3 text-gray-300" />
                </button>
              </DialogClose>
            </div>
            <div className="px-6 pb-6">
              <div className="w-full overflow-hidden mb-3">
                <DialogDescription className="text-right text-sm font-normal leading-6 text-gray-500 break-all whitespace-normal w-full">
                  {rules
                    ? rules
                    : 'لورم اپیسوم یک متن ساختگی است که در فناوری های تکنو بسیار از بقیه رقبا جلوتر و همچنین با کیفیت برخوردار است که یکی از لایقان آن زمین'}
                </DialogDescription>
              </div>
              <div
                className="flex items-center justify-start lg:gap-2 gap-[10px] overflow-hidden"
                onClick={() => setRulesAccepted((prev) => !prev)}
              >
                <div className="relative shrink-0 lg:w-7 lg:h-7 w-[21px] h-[21px]">
                  <Checkbox
                    data-state={rulesAccepted ? 'checked' : 'unchecked'}
                    className="data-[state='unchecked']:bg-gray-100 lg:rounded-md rounded-[4px] lg:w-7 lg:h-7 w-[21px] h-[21px] aspect-square data-[state='checked']:bg-green-500 transition-all duration-500 peer cursor-pointer"
                  />
                  <IconsaxIcons
                    name="TickSquare"
                    variant="Bold"
                    color="white"
                    className="lg:w-4 lg:h-4 w-[12px] h-[12px] aspect-square absolute top-[50%] left-[50%] block -translate-y-[50%] -translate-x-[50%] peer-data-[state=unchecked]:opacity-0 peer-data-[state=checked]:opacity-100 pointer-events-none"
                  />
                </div>
                <Label className="truncate block text-right w-full lg:text-cs08 text-[12px] lg:font-medium font-semibold text-black cursor-pointer">
                  قوانین و مقرارت مطالعه کردم
                </Label>
              </div>
            </div>
            <DialogFooter dir="ltr" className="px-6 pb-6">
              <DialogClose asChild>
                <button
                  disabled={fetchData.isPending || !rulesAccepted}
                  className="flex items-center justify-center lg:px-6 px-4 lg:py-2.5 py-2 rounded-lg lg:text-cs08 text-cs07 font-medium text-white bg-green-600 w-full transition-all duration-500 disabled:bg-gray-100 disabled:text-gray-300 h-[40px]"
                  onClick={async () => {
                    await fetchData.mutateAsync({
                      code: code,
                      discount_type:
                        type === 'room' ? 'room' : 'shopping_center',
                    });
                    setRulesAccepted(false);
                  }}
                >
                  {!fetchData.isPending ? (
                    'دریافت جایزه'
                  ) : (
                    <Loading className="bg-black" />
                  )}
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }
}
