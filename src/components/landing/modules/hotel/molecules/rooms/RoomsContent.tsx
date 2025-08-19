import RoomsArea from './RoomsArea';
import { TopBarConfig } from '@/components/landing/shared';
import { DDatePicker } from '@/components/landing/shared/search/date-picker';
import NumberOfNights from '@/components/landing/shared/search/NumberOfNights';
import Passengers from '@/components/landing/shared/search/passengers/Passengers';

type Props = {
  data?: any;
  status: 'success' | 'pending' | 'error';
};

// ------------------------------

export function RoomsContent(props: Props) {
  const { data, status } = props;

  return (
    <>
      <div className="flex justify-between items-center">
        <TopBarConfig title={{ type: 'single', text: 'اتاق‌ها' }} />

        {status !== 'pending' && (
          <div className="h-10 px-4 text-cs08 font-semibold bg-cs-dark-blue text-zinc-100 flex-center gap-1 rounded-lg lg:w-28 lg:h-12 lg:rounded-[10px] lg:hidden">
            <span>{data?.length}</span>
            {data?.[0]?.room_count && data?.[0]?.pack_rooms ? (
              <span>نتیجه</span>
            ) : (
              <span>اتاق</span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 lg:space-y-10">
        <div className="hidden lg:grid text-cs08 font-bold items-end grid-cols-[65%_auto] gap-4">
          <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-4">
            <DDatePicker sideOffset={15} triggerType="else" />
            <NumberOfNights type="else" />
            <Passengers sideOffset={15} triggerType="else" />
          </div>

          <div className="flex gap-4 mr-auto">
            {status !== 'pending' && (
              <div className="h-10 px-4 text-cs08 font-semibold bg-cs-dark-blue text-zinc-100 flex-center gap-1 rounded-lg lg:w-28 lg:h-12 lg:rounded-[10px]">
                <span>{data?.length}</span>
                {data?.[0]?.room_count && data?.[0]?.pack_rooms ? (
                  <span>نتیجه</span>
                ) : (
                  <span>اتاق</span>
                )}
              </div>
            )}
          </div>
        </div>

        <RoomsArea data={data} status={status} />
      </div>
    </>
  );
}
