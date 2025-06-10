'use client';

import { useState } from 'react';
import { TopBarConfig } from '../../shared';

import NormalRoom from './molecules/rooms/NormalRoom';
import PackedRoom from './molecules/rooms/PackedRoom';
import SeeMoreButton from './molecules/rooms/atoms/SeeMoreButton';

import RoomTypeSwitchCase from './molecules/rooms/RoomTypeSwitchCase';
import NumberOfNights from '../../shared/search/molecules/NumberOfNights';
import Passengers from '../../shared/search/molecules/passengers/Passengers';
import DDatePicker from '../../shared/search/molecules/date-picker/DDatePicker';
import { Section } from './molecules/Section';

type Props = {
  rooms: any;
  hotelName: string;
};

type RoomTypes = 'normal' | 'packed';

// --------------------------------

export function Rooms(props: Props) {
  const { hotelName, rooms } = props;

  const numberOfNights = 9;
  const [roomTypes, setRoomTypes] = useState<RoomTypes>('normal');

  return (
    <Section sectionID="rooms">
      <TopBarConfig
        title={{
          type: 'single',
          text: `${hotelName ? `اتاق های هتل ${hotelName}` : 'اتاق ها'}`,
        }}
      />

      <div className="space-y-6 lg:space-y-10">
        {/* === Settings */}
        <div className="text-cs75 font-bold grid grid-cols-[1.5fr_5rem] items-end gap-3 lg:grid-cols-[1fr_15rem_5rem_7rem] xl:text-cs08 xl:grid-cols-[1fr_17rem_7rem_9rem] xl:gap-4">
          {/* === Large-Screen (LG) */}
          <div className="grid-cols-[1.6fr_0.8fr_1fr] gap-3 hidden lg:grid">
            <DDatePicker sideOffset={15} triggerType="else" />
            <NumberOfNights type="else" />
            <Passengers sideOffset={15} triggerType="else" />
          </div>

          <RoomTypeSwitchCase
            roomType={roomTypes}
            setRoomTypes={setRoomTypes}
          />

          {/* === NumberOfRooms */}
          <div className="bg-cs-dark-blue text-zinc-100 h-11 flex-center gap-1 rounded-lg lg:h-12">
            <span>{300}</span>
            <span>اتاق</span>
          </div>

          {/* === Search-Button */}
          <button className="bg-cs-red text-zinc-100 h-12 hidden rounded-lg lg:block">
            جستجو اتاق
          </button>
        </div>

        {/* === Rooms-Area */}
        <div className="grid gap-6">
          {roomTypes === 'normal'
            ? rooms.normal?.map((room: any, index: number) => (
                <NormalRoom
                  key={index}
                  room={room}
                  numberOfNights={numberOfNights}
                />
              ))
            : rooms.packed?.map((room: any, index: number) => (
                <PackedRoom
                  key={index}
                  room={room}
                  numberOfNights={numberOfNights}
                />
              ))}
        </div>

        <SeeMoreButton />
      </div>
    </Section>
  );
}
