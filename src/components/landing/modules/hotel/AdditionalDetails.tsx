'use client';

import { TopBarConfig } from '../../shared';

type Props = {
  details: string;
};

// -----------------------------------------

export function AdditionalDetails(props: Props) {
  const { details } = props;

  if (!details) return null;

  return (
    <div id="additional-detail">
      <TopBarConfig
        className="mb-1 lg:mb-2"
        title={{ type: 'single', text: 'توضیحات تکمیلی' }}
      />

      <p className="text-zinc-600 text-cs08/6 text-justify font-semibold overflow-hidden lg:text-cs85/7">
        {details}
      </p>
    </div>
  );
}
