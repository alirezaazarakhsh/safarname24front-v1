'use client';

import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { Button } from '@/components/ui/button';
import { UploadComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Loading from '../ui/loading';
import toast from '../ui/customSonner/toast';
import UploadSheet from './uploadSheet';
import useApiMutation from '@/hooks/dashboard/useApiMutation';

export default function Upload({
  className,
  fetchURL,
  hideSubmit = false,
  useSingleFile = false,
  onChange,
  disabled = false
}: UploadComponentPropsType): ReactNode {
  const [isErrored, setErrored] = useState<boolean>(false);
  const [isUploading, setUploading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    inputRef,
    rootRef,
    isFileDialogActive,
  } = useDropzone({
    multiple: !useSingleFile,
    maxFiles: useSingleFile ? 1 : 3,
    maxSize: 30 * 1024 * 1024,
    accept: {
      'image/*': [],
      'application/zip': ['.zip'],
      'application/x-rar-compressed': ['.rar'],
    },
    onDropRejected: () => {
      setErrored(true);
      setFiles([]);
    },
    onDropAccepted: (accepted) => {
      setErrored(false);
      setFiles(accepted);

      if (hideSubmit && onChange && accepted) {
        const file: File = accepted[0];
        onChange(file);
      }
    },
  });

  const uploadComponentFetching = useApiMutation({
    url: fetchURL ?? '',
    method: 'post',
    options: {
      onError: () => {
        toast({
          title: 'مشکلی در اپلود فایل رخ داد!',
          description: 'کاربر گرامی، فایل مد نظر شما اپلود نشد!',
          theme: 'theme',
        });
      },
      onSuccess: () => {
        const inputEl = inputRef.current;
        const rootEl = rootRef.current;
        if (inputEl) inputEl.value = '';
        if (rootEl) rootEl.click();
        setFiles([]);
        toast({
          title: 'فایل مد نظر اپلود شد',
          description: files.length
            ? files.map((f) => f.name).join(' | ')
            : 'فایل شما با موفقیت اپلود شد :)',
          theme: 'green',
        });
      },
    },
  });

  return (
    <div
      data-disabled={disabled}
      className={cn(
        'bg-white border border-black/10 lg:rounded-[10px] rounded-[14px] overflow-hidden flex flex-col items-start justify-start lg:w-[50%] w-full transition-all duration-500 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed',
        className,
      )}
    >
      <div className="lg:p-4 p-[14px] flex items-center justify-start border-b border-b-black/10 gap-3 shrink-0 w-full">
        <div className="shrink-0 size-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="CloudAdd"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
            بارگزاری فایل مربوطه
          </span>
          <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
            فایل، عکس، فاکتور و غیره میتوانید در این قسمت آپلود کنید.
          </p>
        </div>
      </div>
      <div className="lg:px-3 lg:py-4 px-[14px] py-[14px] h-full border-b border-b-black/10 w-full flex">
        <div
          {...getRootProps()}
          data-disabled={disabled}
          className={cn(
            'w-full bg-white border-black/10 text-black lg:border-[3px] border-2 lg:rounded-xl rounded-[10px] border-dashed flex items-center justify-center cursor-pointer transition-all duration-500 px-4 lg:h-full h-[129px] disabled:pointer-events-none',
            (isDragActive || isFileDialogActive) && 'bg-black/5',
          )}
        >
          <input {...getInputProps()} multiple={!useSingleFile} hidden disabled={disabled} />
          <div className="overflow-hidden">
            <IconsaxIcons
              color={isErrored ? '#F30F26' : 'currentColor'}
              name={isErrored ? 'Warning2' : 'DocumentUpload'}
              className="lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] block mx-auto lg:mb-3 mb-2"
            />
            {files.length === 0 ? (
              <p className="text-current font-normal lg:text-xs text-[10px] block text-center truncate mb-2">
                <span className="font-bold inline-block lg:ml-[4px] ml-[3px]">
                  کلیک کردن برای آپلود فایل
                </span>
                یا درگ کردن فایل
              </p>
            ) : (
              <p className="text-current font-normal lg:text-xs text-[10px] block text-center truncate mb-2">
                {files.map((item) => item.name).join(' | ')}
              </p>
            )}
            <span
              className={cn(
                'font-normal lg:text-xs text-[10px] block text-center truncate',
                isErrored ? 'text-cs-red' : 'text-current/10',
              )}
            >
              {isErrored
                ? 'خطایی رخ داد، مشتری گرامی حداکثر وارد کردن فایل 30MB میباشد!'
                : files.length === 0
                  ? 'حداکثر آپلود فایل 30MB میباشد'
                  : `حجم فایل : ${Math.ceil(
                    files.reduce((acc, file) => acc + file.size, 0) /
                    (1024 * 1024),
                  )} مگابایت`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 lg:p-4 p-[14px] shrink-0 w-full overflow-auto scrollbar-hide">
        <div className="flex items-center justify-between gap-3">
          {
            !hideSubmit && (
              <Button
                className="bg-black lg:rounded-lg rounded-[8px] !h-[40px] flex items-center justify-center lg:py-3 py-0 lg:px-5 px-[20px] transition-all duration-500 disabled:bg-gray-100 disabled:opacity-100 disabled:text-black/50 text-white"
                onClick={async () => {
                  if (fetchURL && files.length > 0) {
                    const formData = new FormData();
                    files.forEach((f) => formData.append(`file`, f));
                    await uploadComponentFetching.mutateAsync(formData);
                  } else {
                    setUploading(true);
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                    setUploading(false);
                    toast({
                      title: 'فایل مد نظر اپلود شد',
                      description: files.length
                        ? files.map((f) => f.name).join(' | ')
                        : 'فایل شما با موفقیت اپلود شد :)',
                      theme: 'green',
                    });
                  }
                }}
                disabled={
                  fetchURL
                    ? uploadComponentFetching.isPending || files.length === 0
                    : files.length === 0 || isUploading
                }
              >
                {fetchURL ? (
                  uploadComponentFetching.isPending ? (
                    <Loading />
                  ) : (
                    <span className="font-normal text-current truncate block w-full text-center lg:text-xs text-[10px]">
                      آپلود فایل
                    </span>
                  )
                ) : isUploading ? (
                  <Loading />
                ) : (
                  <span className="font-normal text-current truncate block w-full text-center lg:text-xs text-[10px]">
                    آپلود فایل
                  </span>
                )}
              </Button>

            )
          }
          {files.length > 0 && (
            <UploadSheet
              onDelete={(index) => {
                const removedFiles = files.filter(
                  (_, itemIndex) => itemIndex !== index,
                );

                setFiles(removedFiles);
              }}
              files={files}
            />
          )}
        </div>
        <Button
          disabled={files.length === 0}
          onClick={() => {
            setFiles([]);
            onChange(undefined);
          }}
          className="transition-all duration-500 lg:w-auto w-[40px] h-[40px] lg:rounded-lg rounded-[10px] lg:gap-2 flex items-center justify-center lg:p-3 bg-cs-red/5 hover:bg-cs-red/10 text-cs-red disabled:bg-gray-100 disabled:text-black/50 disabled:opacity-100 disabled:hover:bg-gray-100"
        >
          <IconsaxIcons
            name={'Trash'}
            color="currentColor"
            className="h-[20px] w-[20px]"
          />
          <span className="font-normal truncate w-full text-right text-xs text-current lg:block hidden">
            حذف فایل
          </span>
        </Button>
      </div>
    </div>
  );
}
