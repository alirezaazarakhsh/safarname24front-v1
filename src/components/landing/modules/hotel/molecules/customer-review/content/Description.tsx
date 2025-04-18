import {
  useAddCommentContext,
  useAddCommentDispatch,
} from '@/context/AddCommentContext';

// --------------------------------------

export function Description() {
  const dispatch = useAddCommentDispatch();
  const { description } = useAddCommentContext();

  return (
    <textarea
      name="description"
      value={description}
      placeholder="نظر خود را در مورد اقامت خود بنویسید ..."
      className="bg-white w-full h-full text-zinc-700 text-cs85/6 font-semibold p-5 resize-none outline-none placeholder:font-medium rounded-cs-10 shadow-[0_0_1.5rem_rgba(0,0,0,0.05)]"
      onChange={(e) =>
        dispatch({
          type: 'DESCRIPTION',
          payload: { description: e.target.value },
        })
      }
    />
  );
}
