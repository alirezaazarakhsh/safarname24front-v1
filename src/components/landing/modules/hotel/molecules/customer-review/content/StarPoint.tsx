import {
  useAddCommentContext,
  useAddCommentDispatch,
} from '@/context/AddCommentContext';

import AccordionCard from '../AccordionCard';

// --------------------------------------

export function StarPoint() {
  const { star } = useAddCommentContext();
  const dispatch = useAddCommentDispatch();

  return (
    <AccordionCard trigger="* ستاره مورد نظر خود را انتخاب نمایید (ضروری)">
      <div className="grid grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            onClick={() =>
              dispatch({ type: 'STAR', payload: { star: number } })
            }
            className={`relative z-10 h-10 text-cs85 font-bold overflow-hidden rounded-lg transition-colors duration-300 ease-in-out ${star === number ? 'text-white' : 'bg-zinc-100 text-zinc-800'}`}
          >
            <span>{number}</span>

            <span
              className={`absolute -z-10 inset-0 bg-cs-dark-blue rounded-lg transition-all duration-200 ease-in-out ${star === number ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            ></span>
          </button>
        ))}
      </div>
    </AccordionCard>
  );
}
