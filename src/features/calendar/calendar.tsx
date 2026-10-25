'use client';

import React, { useState } from 'react';
import { HotelCalendarProps } from './types';
import { useCalendar } from './use-calendar';
// import { DesktopCalendar } from './desktop-calendar';
import './style.css';
import MobileCalendarDrawer from './mobile-calendar-drawer';
import CalendarWrapper from './calendar-wrapper';
import { DateObject } from 'react-multi-date-picker';

type Props = {
  initialRange?: [DateObject | null, DateObject | null];
  onChange: (newDate: [DateObject | null]) => void;
};

// ------------------------------

export function Calendar(props: Props) {
  const { initialRange, onChange } = props;

  const {
    calendarType,
    toggleCalendarType,
    selectedDates,
    tempMobileDates,
    setTempMobileDates,
    handleDesktopChange,
    handleMobileConfirm,
    handleClear,
    currentCalendar,
    currentLocale,
  } = useCalendar(initialRange, onChange);

  return (
    <CalendarWrapper
      isOpen={isOpenMobile}
      onClose={onCloseMobile}

      calendar={currentCalendar}
      locale={currentLocale}
      calendarType={calendarType}
      toggleCalendarType={toggleCalendarType}

      selectedDates={selectedDates}
      tempDates={tempMobileDates}
      onTempDatesChange={setTempMobileDates}
      onDatesChange={handleDesktopChange}
      onConfirm={handleMobileConfirm}
    />

    // <MobileCalendarDrawer
    //   isOpen={isOpenMobile}
    //   onClose={onCloseMobile}
    //   onDatesChange={handleDesktopChange}
    //   calendarType={calendarType}
    //   toggleCalendarType={toggleCalendarType}
    //   tempDates={tempMobileDates}
    //   selectedDates={selectedDates}
    //   onTempDatesChange={setTempMobileDates}
    //   onConfirm={handleMobileConfirm}
    //   calendar={currentCalendar}
    //   locale={currentLocale}
    // />
  );
}
