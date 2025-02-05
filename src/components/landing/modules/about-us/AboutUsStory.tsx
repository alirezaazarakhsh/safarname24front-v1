import React from 'react';
import { TopBarConfig } from '../../shared';

type Props = {
  story: string;
};

// -----------------------------------------------

export function AboutUsStory(props: Props) {
  const { story } = props;

  return (
    <div>
      <TopBarConfig title='درباره ما' subtitle='داستان آژانس سفرنامه 24 از کجا شروع شد ؟' />

      <div className='grid gap-4 lg:grid-cols-2'>
        {/* Story */}
        <div className='bg-white p-5 rounded-xl'>
            <h2>داستان سفرنامه 24</h2>
          <p className=''>{story}</p>
        </div>
      </div>
    </div>
  );
}
