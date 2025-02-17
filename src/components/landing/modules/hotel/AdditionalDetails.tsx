'use client';

import { TopBarConfig } from '../../shared';

type Props = {
  details: string;
};

// -----------------------------------------

export function AdditionalDetails(props: Props) {
  const { details } = props;

  return (
    <div>
      <TopBarConfig title='توضیحات تکمیلی' className='mb-1 lg:mb-1' />

      <p className='text-zinc-600 text-cs75/6 text-justify font-semibold overflow-hidden'>{details}</p>
    </div>
  );
}
