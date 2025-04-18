import {
  useAddCommentContext,
  useAddCommentDispatch,
} from '@/context/AddCommentContext';

import AccordionCard from '../AccordionCard';
import { GrFormCheckmark } from 'react-icons/gr';

// --------------------------------------

export function NegativePoints() {
  const dispatch = useAddCommentDispatch();
  const { negativePoints } = useAddCommentContext();

  return (
    <AccordionCard trigger="نظرات منفی خود را انتخاب نمایید">
      <div className="grid gap-y-5">
        {negativePoints?.map((point, index) => (
          <button
            key={index}
            className="flex items-center gap-2.5 select-none"
            onClick={() =>
              dispatch({
                type: 'NEGATIVE-POINTS',
                payload: { title: point.title },
              })
            }
          >
            <span className="relative z-10 bg-zinc-100 flex w-5 h-5 overflow-hidden rounded-md transition-colors duration-200 ease-in-out">
              <span
                className={`absolute -z-10 inset-0 bg-cs-dark-blue flex-center rounded transition-all duration-200 ease-in-out ${point.isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
              >
                <GrFormCheckmark size={16} color="#fff" />
              </span>
            </span>

            <span className="text-zinc-800 text-cs08 font-semibold truncate">
              {point.title}
            </span>
          </button>
        ))}
      </div>
    </AccordionCard>
  );
}
