// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import Sheet from '../ui/sheet';
import { Button } from '@/components/ui/button';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { UploadSheetComponentPropsType } from '@/types/dashboard/component';
import UploadedFile from './uploadedFile';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETUploadedDocuments } from '@/types/dashboard/api/get';

// Defining a fake constant to render fake data of files
const files: {
  name: string;
  size: number; // In Bytes, Number * 1024 * 1024
}[] = [
  {
    name: 'IMG.Random File.png1',
    size: 10 * 1024 * 1024,
  },
  {
    name: 'IMG.Random File.png2',
    size: 10 * 1024 * 1024,
  },
  {
    name: 'IMG.Random File.png3',
    size: 10 * 1024 * 1024,
  },
  {
    name: 'IMG.Random File.png4',
    size: 10 * 1024 * 1024,
  },
  {
    name: 'IMG.Random File.png5',
    size: 10 * 1024 * 1024,
  },
];

// Creating and exporting UploadSheet component as default
export default function UploadSheet({
  fetchURL,
}: UploadSheetComponentPropsType): ReactNode {
  // Defining states of component
  const [isSheetOpened, setSheetOpened] = useState<boolean>(false);

  // Defining hooks to fetch apis
  const fetchUploadedFiles = useApiQuery<GETUploadedDocuments>({
    url: fetchURL || '/',
    queryKey: ['uploadedLegalDocuments'],
    options: {
      enabled: isSheetOpened && fetchURL ? true : false,
    },
  });

  // Returning JSX
  return (
    <>
      <Button
        className='bg-white border border-black/10 lg:rounded-lg h-[40px] rounded-[8px] flex items-center justify-center lg:py-3 py-0 lg:px-5 px-[10px] hover:bg-gray-50'
        onClick={() => setSheetOpened(true)}
      >
        <span className='font-normal text-black/60 truncate block w-full text-center lg:text-xs text-[10px]'>
          مشاهده تمام فایل
        </span>
      </Button>
      <Sheet isOpened={isSheetOpened} closeFn={() => setSheetOpened(false)}>
        <div className='flex items-center justify-between gap-3 pb-3 border-b-2 border-dashed border-gray-200'>
          <span className='text-right font-medium text-cs07 block w-full truncate overflow-hidden'>
            لیست فایل های آپلود شده
          </span>
          <Button
            onClick={() => setSheetOpened(false)}
            className='bg-white border border-black/10 rounded-lg flex items-center justify-center px-3 py-2 hover:bg-gray-50 shrink-0'
          >
            <IconsaxIcons className='w-3 h-3 text-black/60' name='Add' />
            <span className='font-normal text-black/60 truncate block w-full text-center text-xs'>
              مشاهده تمام فایل
            </span>
          </Button>
        </div>
        <div className='flex flex-col'>
          {fetchURL ? (
            fetchUploadedFiles.isLoading || fetchUploadedFiles.isRefetching ? (
              [...new Array(5)].map((_, index) => (
                <UploadedFile
                  key={index}
                  isLastItem={index === 5}
                  index={index}
                  isLoading
                />
              ))
            ) : fetchUploadedFiles.isError ||
              fetchUploadedFiles.data?.length === 0 ? (
              <div className='mt-3'>
                <span className='font-bold text-cs75 text-center text-black w-full block'>
                  چیزی برای نمایش وجود ندارد.
                </span>
              </div>
            ) : (
              fetchUploadedFiles.data &&
              fetchUploadedFiles.data.map((item, index) => (
                <UploadedFile
                  fetchURL={fetchURL}
                  index={index}
                  key={index}
                  isLastItem={fetchUploadedFiles.data.length === index + 1}
                  refetch={fetchUploadedFiles.refetch}
                  data={{
                    name: item.file,
                    id: item.id,
                  }}
                />
              ))
            )
          ) : (
            files.map((item, index) => (
              <UploadedFile
                index={index}
                key={index}
                isLastItem={files.length === index + 1}
                data={{ id: index + 1, ...item }}
              />
            ))
          )}
        </div>
      </Sheet>
    </>
  );
}
