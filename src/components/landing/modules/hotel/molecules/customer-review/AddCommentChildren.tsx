import { ArrowRight } from 'iconsax-react';

import { IoClose } from 'react-icons/io5';
import {
  Description,
  NegativePoints,
  PositivePoints,
  Rating,
  StarPoint,
} from './content';

type Props = {
  closeDialog: () => void;
  commentType: CommentType;
  setCommentType: (value: CommentType) => void;
};

type CommentType = 'rating' | 'desc';

const switchCaseButton =
  'w-1/2 flex-center rounded-md transition-colors duration-300 ease-in-out';

// --------------------------------------

export default function AddCommentChildren(props: Props) {
  const { closeDialog, commentType, setCommentType } = props;

  return (
    <>
      {/* Navbar | Switch-Case */}
      <div className="flex flex-col justify-center gap-y-6">
        <div className="flex items-center gap-4 md:justify-between md:flex-row-reverse">
          <button onClick={closeDialog}>
            <ArrowRight size={22} color="#444" className="md:hidden" />
            <IoClose
              color="#999"
              className="bg-zinc-200/60 w-8 h-8 p-1.5 hidden rounded-md md:block"
            />
          </button>

          <span className="text-cs09 font-bold md:text-cs95">
            ثبت نظرات کاربران
          </span>
        </div>

        {/* ----------------- */}

        <div className="relative z-10 bg-white w-full h-11 text-cs08 font-bold flex overflow-hidden rounded-cs-10 shadow-[0_0_1.5rem_rgba(0,0,0,0.05)]">
          <button
            className={`${switchCaseButton} ${commentType === 'rating' ? 'text-white' : 'text-zinc-700'}`}
            onClick={() => setCommentType('rating')}
          >
            امتیازدهی
          </button>

          <button
            className={`${switchCaseButton} ${commentType === 'desc' ? 'text-white' : 'text-zinc-700'}`}
            onClick={() => setCommentType('desc')}
          >
            متن توضیحات
          </button>

          <div
            className={`absolute inset-y-0 -z-10 w-1/2 bg-cs-dark-blue transition-all duration-300 ease-in-out rounded-cs-10 ${
              commentType === 'rating' ? 'right-0' : 'right-1/2'
            }`}
          />
        </div>
      </div>

      {/* Content */}
      {commentType === 'rating' ? (
        <div className="full-size pl-4 space-y-5 overflow-auto custom-scrollbar">
          <StarPoint />
          <Rating />
          <PositivePoints />
          <NegativePoints />
        </div>
      ) : (
        <Description />
      )}

      {/* Submit */}
      <div className="flex items-center">
        <button
          className={`w-full h-12 text-cs09 font-semibold rounded-cs-10 transition-all duration-300 ease-in-out ${true ? 'bg-cs-blue text-white' : 'bg-zinc-200 text-zinc-600'}`}
        >
          ثبت دیدگاه
        </button>
      </div>
    </>
  );
}
