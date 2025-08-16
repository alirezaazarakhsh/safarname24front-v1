'use client';

import { Button } from '@/components/ui/button';
import { UploadedFileComponentPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

export default function UploadedFile({
  data,
  isLastItem = false,
  index,
  onDelete,
}: UploadedFileComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div className={isLastItem ? 'pt-3' : 'py-3 border-b border-b-gray-400'}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-cs07 font-normal text-black truncate block w-full overflow-hidden text-right">
          {`${index + 1} فایل شماره`}
        </span>
        <div className="flex items-center justify-between gap-3">
          <Button
            onClick={() => onDelete && onDelete(index)}
            className="transition-all duration-500 rounded-md gap-2 flex items-center justify-center p-3 text-cs-red bg-cs-red/10 hover:bg-cs-red/20 shrink-0 h-[30px] w-[30px]"
          >
            <IconsaxIcons
              name="Trash"
              color="currentColor"
              className="w-[10px] h-[10px]"
            />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-50 shrink-0 h-[30px]">
                <span className="font-normal text-black/60 truncate block w-full text-center text-cs07">
                  مشاهده فایل
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="px-3 py-3 border-b border-b-black/10">
                <DialogClose asChild>
                  <button className="flex items-center justify-between gap-[10px] w-full">
                    <DialogTitle className="text-right text-[14px] font-semibold text-black block truncate w-full flex-1">
                      {data?.name}
                    </DialogTitle>
                    <IconsaxIcons
                      name="CloseCircle"
                      className="size-4 text-current"
                      color="black"
                    />
                  </button>
                </DialogClose>
              </div>
              <Image
                alt={data?.name || 'فایل اپلود شده'}
                width={1080}
                height={1080}
                src={data ? URL.createObjectURL(data) : ''}
                className="aspect-square w-[300px] object-cover bg-purple-300 mx-auto block"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="font-normal text-black/60 truncate block w-full text-right text-cs07">
          اسم فایل :
        </span>
        <span className="font-normal text-black truncate block w-full text-left text-cs07">
          {data?.name ?? 'N/A'}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="font-normal text-black/60 truncate block w-full text-right text-cs07">
          حجم فایل آپلودی :
        </span>
        <span className="font-normal text-black truncate block w-full text-left text-cs07">
          {data?.size ? `${(data.size / (1024 * 1024)).toFixed(2)} MB` : 'N/A'}
        </span>
      </div>
    </div>
  );
}
