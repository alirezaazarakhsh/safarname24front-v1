import {
  useAddCommentContext,
  useAddCommentDispatch,
} from '@/context/AddCommentContext';

import ReactSlider from 'react-slider';
import AccordionCard from '../AccordionCard';

// --------------------------------------

export function Rating() {
  const dispatch = useAddCommentDispatch();
  const { standards } = useAddCommentContext();

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
                  type: 'STANDARDS',
                  payload: { title: standard.title, value: newValue },
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
