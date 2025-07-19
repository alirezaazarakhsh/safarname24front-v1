import {
  useAddCommentContext,
  useAddCommentDispatch,
} from '@/context/AddCommentContext';

import { useEffect } from 'react';
import ReactSlider from 'react-slider';
import { useQuery } from '@tanstack/react-query';

import AccordionCard from '../AccordionCard';
import { generalInstance } from '@/utils/services';

type ApiResponse = {
  data: {
    suggested_comment_items: {
      id: number;
      title: string;
    }[];
  };
};

// --------------------------------------

export function Rating() {
  const dispatch = useAddCommentDispatch();
  const { standards } = useAddCommentContext();

  const { data } = useQuery<ApiResponse>({
    queryKey: ['hotel-comments-items'],
    queryFn: () =>
      generalInstance('/hotel/hotels/comments/points-and-suggestions/'),
  });

  // === Set Initial-State
  useEffect(() => {
    const stopCondition = !data?.data.suggested_comment_items;
    if (stopCondition) return;

    dispatch({
      type: 'STANDARDS-INIT',
      payload: data?.data.suggested_comment_items.map((item) => ({
        ...item,
        value: 0,
      })),
    });
  }, [data?.data]);

  return (
    <AccordionCard trigger="امتیاز هر کدام از گزینه های زیر را وارد نمایید">
      <div className="space-y-6">
        {standards?.map((standard, id) => (
          <div key={id} className="space-y-1.5">
            <div className="text-zinc-800 text-cs08 font-bold flex-between">
              <span>{standard.title}</span>
              <span>{standard.value}</span>
            </div>

            <ReactSlider
              invert
              max={5}
              min={0}
              step={0.1}
              className="w-full h-4 flex-center"
              value={[standard.value]}
              onChange={(value: number | number[]) => {
                const newValue = Array.isArray(value) ? value[0] : value;
                dispatch({
                  type: 'STANDARDS-CHANGE',
                  payload: { id: standard.id, value: newValue },
                });
              }}
              renderTrack={(props, state) => {
                const { key, ...restProps } = props;
                return (
                  <div
                    key={key}
                    {...restProps}
                    className={`h-1 rounded-full ${
                      state.index === 0 ? 'bg-cs-blue' : 'bg-zinc-100'
                    }`}
                  />
                );
              }}
              thumbClassName="bg-cs-blue w-3 h-3 rounded-full"
            />
          </div>
        ))}
      </div>
    </AccordionCard>
  );
}
