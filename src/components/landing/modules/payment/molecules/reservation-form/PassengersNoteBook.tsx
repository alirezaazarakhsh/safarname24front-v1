import {
  NoteBookItem,
  PassengersNotebookList,
  PassengersNotebookHeader,
  PassengersNotebookTrigger,
} from '../../atoms/reservation-form';

import { useState } from 'react';
import { Person } from '../../helpers/type';

import { axiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { Sheet, SheetContent } from '@/components/ui/sheet';

type ApiResponse = {
  id: number;
  last_name: string;
  first_name: string;
  phone_number: string;
  identification_code: string;
}[];

type Props = {
  idx: number;
  fillPassenger: (idx: number, passengerData: Person) => void;
};

// ------------------------------

export function PassengersNoteBook(props: Props) {
  const { idx, fillPassenger } = props;

  const [sheetIsOpen, setSheetOpen] = useState(false);
  const [searchedValue, setSearchedValue] = useState('');

  const handleCloseSheet = () => setSheetOpen(false);

  const { data, status } = useQuery<ApiResponse>({
    enabled: sheetIsOpen,
    staleTime: 1000 * 60 * 5,
    queryKey: ['passengers-notebook'],
    queryFn: async () => {
      const response = await axiosInstance('hotel/reservation/passengers/');
      return response.data;
    },
  });

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetOpen}>
      <PassengersNotebookTrigger />

      <SheetContent className="w-full grid grid-rows-[auto_auto_1fr] sm:w-[26rem]">
        {/* === Header */}
        <PassengersNotebookHeader />

        {/* === Title | Search */}
        <div className="font-semibold py-4 border-b grid gap-5">
          <input
            type="text"
            value={searchedValue}
            placeholder="جستجوی مسافر ..."
            onChange={(e) => setSearchedValue(e.target.value)}
            className="h-11 text-zinc-700 text-cs08 px-4 border rounded-lg placeholder:font-medium"
          />

          <span className="text-zinc-600 text-cs85">لیست مسافران :</span>
        </div>

        {/* === List */}
        <PassengersNotebookList isEmpty={data?.length === 0} status={status}>
          {data?.map((passenger, index) => (
            <NoteBookItem
              idx={idx}
              key={index}
              fillPassenger={fillPassenger}
              handleCloseSheet={handleCloseSheet}
              passenger={{
                ...passenger,
                national_code: passenger.identification_code,
              }}
            />
          ))}
        </PassengersNotebookList>
      </SheetContent>
    </Sheet>
  );
}
