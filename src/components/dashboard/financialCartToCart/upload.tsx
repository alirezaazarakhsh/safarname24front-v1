// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { Button } from '@/components/ui/button';
import { UploadComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Loading from '../ui/loading';
import toast from '../ui/customSonner/toast';
import Sheet from '../ui/sheet';

// Creating and exporting Upload component as default
export default function Upload({
  onChange,
}: UploadComponentPropsType): ReactNode {
  // Defining hooks
  const [isErrored, setErrored] = useState<boolean>(false);
  const [isUploading, setUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>();
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    inputRef,
    rootRef,
    isFileDialogActive,
  } = useDropzone({
    maxFiles: 1,
    maxSize: 30 * 1024 * 1024, // 30MB in bytes
    onDropRejected: () => {
      setErrored(true);
      setFile(undefined);
    },
    onDropAccepted: (files) => {
      setErrored(false);
      setFile(files[0]);
    },
    accept: {
      'image/*': [],
    },
  });

  // Using useEffect to attach onChange prop to component
  useEffect(() => onChange(file), [file]);

  // Returning JSX
  return (
    <div className="bg-white border border-black/10 rounded-lg overflow-hidden flex flex-col items-start justify-start w-[50%]">
      <div className="px-3 py-4 flex items-center justify-start border-b border-b-black/10 gap-3 shrink-0 w-full">
        <div className="shrink-0 w-[38px] h-[38px] rounded-md flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="CloudAdd"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full lg:block flex items-center justify-between gap-3">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right lg:mb-1">
            بارگزاری فایل مربوطه
          </span>
          <p className="lg:text-right text-left truncate text-black/50 lg:text-cs75 text-[16px] lg:font-semibold font-bold">
            فایل، عکس، فاکتور و غیره میتوانید در این قسمت آپلود کنید.
          </p>
        </div>
      </div>
      <div className="px-3 py-4 h-full border-b border-b-black/10 w-full flex">
        <div
          {...getRootProps()}
          className={cn(
            'w-full bg-white h-full border-[3px] rounded-xl border-dashed flex items-center justify-center cursor-pointer transition-all duration-500 px-4',
            isDragActive || isFileDialogActive
              ? 'border-cs-red text-cs-red bg-cs-red/10'
              : 'text-black border-black/10',
          )}
        >
          <input {...getInputProps()} hidden />
          <div className="overflow-hidden">
            <IconsaxIcons
              color={isErrored ? '#F30F26' : 'currentColor'}
              name={isErrored ? 'Warning2' : 'DocumentUpload'}
              className="w-[40px] h-[40px] block mx-auto mb-3"
            />
            {acceptedFiles.length === 0 ? (
              <p className="text-current font-normal text-xs block text-center truncate mb-2">
                <span className="font-bold inline-block ml-[4px]">
                  کلیک کردن برای آپلود فایل
                </span>
                یا درگ کردن فایل
              </p>
            ) : (
              <p className="text-current font-normal text-xs block text-center truncate mb-2">
                {acceptedFiles[0].name}
              </p>
            )}
            <span
              className={cn(
                'font-normal text-xs block text-center truncate',
                isErrored ? 'text-cs-red' : 'text-current/10',
              )}
            >
              {isErrored
                ? 'خطایی رخ داد، مشتری گرامی حداکثر وارد کردن فایل 30MB میباشد!'
                : acceptedFiles.length === 0
                  ? 'حداکثر آپلود فایل 30MB میباشد'
                  : `حجم فایل : ${Math.ceil(acceptedFiles[0].size / (1024 * 1024))} مگابایت`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 px-3 py-4 shrink-0 w-full overflow-auto scrollbar-hide">
        <div className="flex items-center justify-between gap-3">
          <Sheet>HIHIHIHIH</Sheet>
          <Button
            onClick={async () => {
              setUploading(true);
              await new Promise((resolve) => setTimeout(resolve, 5000));

              setUploading(false);
              toast({
                title: 'فایل مد نظر اپلود شد',
                description: file
                  ? file.name
                  : 'فایل شما با موفقیت اپلود شد :)',
                theme: 'green',
              });
            }}
            disabled={file === undefined || isUploading}
            className="bg-black rounded-lg flex items-center justify-center py-3 px-5 transition-all duration-500 disabled:bg-gray-100 disabled:opacity-100 disabled:text-black/50 text-white"
          >
            {isUploading ? (
              <Loading />
            ) : (
              <span className="font-normal text-current truncate block w-full text-center text-xs">
                آپلود فایل
              </span>
            )}
          </Button>
          <Button
            className="bg-white border border-black/10 rounded-lg flex items-center justify-center py-3 px-5 hover:bg-gray-50"
            onClick={() => {
              const rootEl = rootRef.current;
              if (rootEl) rootEl.click();
            }}
          >
            <span className="font-normal text-black/60 truncate block w-full text-center text-xs">
              مشاهده تمام فایل
            </span>
          </Button>
        </div>
        <Button
          disabled={acceptedFiles.length === 0}
          onClick={() => {
            const inputEl = inputRef.current;
            const rootEl = rootRef.current;

            if (inputEl) {
              inputEl.value = '';
              rootEl.click();
              setFile(undefined);
            }
          }}
          className={
            'transition-all duration-500 rounded-lg gap-2 flex items-center justify-center p-3 bg-cs-red/10 hover:bg-cs-red/15  text-cs-red disabled:bg-gray-100 disabled:text-black/50 disabled:opacity-100 disabled:hover:bg-gray-100'
          }
        >
          <IconsaxIcons
            name={'Trash'}
            color="currentColor"
            className="h-[20px] w-[20px]"
          />
          <span className="font-normal  truncate block w-full text-right text-xs text-current">
            حذف فایل
          </span>
        </Button>
      </div>
    </div>
  );
}
