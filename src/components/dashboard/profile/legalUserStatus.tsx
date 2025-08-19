// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { LegalUserStatusPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useState } from 'react';
import Image from 'next/image';
import starsBg from '../../../../public/image/subscriptionStars.png';

import IconsaxIcons from '@/components/icons/iconsaxIcons';
import LegalAccountBannedDialog from './dialog/legalAccountBannedDialog';
import Loading from '../ui/loading';

// Creating and exporting LegalUserStatus component as default
export default function LegalUserStatus({
  className,
  rejectReason,
  status,
}: LegalUserStatusPropsType): ReactNode {
  // Defining hooks
  const [rejectReasonDialogOpened, setRejectReasonDialogOpened] =
    useState<boolean>(false);

  // Returning JSX
  return (
    <>
      <LegalAccountBannedDialog
        isOpened={rejectReasonDialogOpened}
        closeFn={() => setRejectReasonDialogOpened(false)}
        infos={[rejectReason || '']}
      />
      <button
        tabIndex={status === 'rejected' ? 0 : -1}
        onClick={() =>
          status === 'rejected' && setRejectReasonDialogOpened(true)
        }
        className={cn(
          'rounded-lg bg-gradient-to-tr bg-[#282828] px-3 py-3 flex items-center gap-3 justify-between text-white overflow-hidden relative h-[50px]',
          status === 'rejected'
            ? 'to-cs-red/20 from-cs-red cursor-pointer'
            : status === 'accpeted'
              ? 'to-green-500/20 from-green-500 cursor-auto'
              : 'to-gray-500/20 from-gray-500 cursor-auto',
          className,
        )}
      >
        <div className="flex items-center justify-start gap-3 flex-1 overflow-hidden">
          <Image
            alt="عکس ستاره ها"
            src={starsBg.src}
            width={340}
            height={180}
            className="absolute top-0 left-0 w-full object-cover scale-105 h-full pointer-events-none"
          />
          {status === 'checking' ? (
            <Loading className="size-1" />
          ) : (
            <IconsaxIcons
              name={status === 'accpeted' ? 'TickSquare' : 'CloseSquare'}
              color="white"
              className="size-[25px]"
            />
          )}
          <div className="w-full overflow-hidden">
            <span className="font-bold text-cs65 text-current block text-right truncate mb-1">
              وضعیت پروفایل حقوقی شما :
            </span>
            <span className="font-medium text-cs06 text-current block text-right truncate">
              {status === 'checking'
                ? 'در حال بررسی'
                : status === 'accpeted'
                  ? 'تایید شده'
                  : 'رد شده'}
            </span>
          </div>
        </div>
        {status === 'rejected' && (
          <div className="aspect-square h-full bg-white text-black rounded-md  font-normal flex items-center justify-center  shrink-0">
            <IconsaxIcons name="Eye" color="currentColor" className="w-[60%]" />
          </div>
        )}
      </button>
    </>
  );
}
