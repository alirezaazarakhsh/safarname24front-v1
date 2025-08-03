import {
  Rating,
  StarPoint,
  Description,
  NegativePoints,
  PositivePoints,
} from './content';

import { IoClose } from 'react-icons/io5';
import { ArrowRight } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/utils/axios';

import { useAddCommentContext } from '@/context/AddCommentContext';
import SendTicketReaction from '../../../contact-us/molecules/SendTicketReaction';

type Props = {
  hotelSlug: string;
  closeDialog: () => void;
  commentType: CommentType;
  setCommentType: (value: CommentType) => void;
};

type Form = {
  text: string;
  stars: number;
  strength_ids: number[];
  weakness_ids: number[];
  suggested_items_with_rating: { id: number; rating: number }[];
};

type CommentType = 'rating' | 'desc';
type ReactionType = 'success' | 'fail';

const switchCaseButton =
  'w-1/2 flex-center rounded-md transition-colors duration-300 ease-in-out';

// --------------------------------------

export default function AddCommentChildren(props: Props) {
  const { closeDialog, commentType, setCommentType, hotelSlug } = props;

  const [reactionOpen, setReactionOpen] = useState(false);
  const [reactionType, setReactionType] = useState<ReactionType>('success');

  const [formIsValid, setFormValid] = useState(false);
  const { star, description, negativePoints, positivePoints, standards } =
    useAddCommentContext();

  useEffect(() => {
    star && description ? setFormValid(true) : setFormValid(false);
  }, [star, description]);

  function handleSetReaction(type: 'success' | 'fail', isOpen: boolean) {
    setReactionType(type);
    setReactionOpen(isOpen);
  }

  async function sendComment() {
    const stopCondition = !star || !description;
    if (stopCondition) return;

    const formData = {
      stars: star,
      text: description,
      strength_ids: positivePoints
        .filter((item) => item.isSelected)
        .map(({ id }) => id),
      weakness_ids: negativePoints
        .filter((item) => item.isSelected)
        .map(({ id }) => id),
      suggested_items_with_rating: standards.map(({ id, value }) => ({
        suggested_item_id: id,
        rating: value,
      })),
    };

    try {
      await axiosInstance({
        url: `/hotel/hotels/${hotelSlug}/comments/create/`,
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      handleSetReaction('success', true);
    } catch (error) {
      console.error(error);
      handleSetReaction('fail', true);
    }
  }

  return (
    <>
      <SendTicketReaction
        isOpen={reactionOpen}
        setOpen={setReactionOpen}
        reactionType={reactionType}
      />

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
          onClick={sendComment}
          disabled={!formIsValid}
          className={`w-full h-12 text-cs09 font-semibold rounded-cs-10 transition-all duration-300 ease-in-out ${formIsValid ? 'bg-cs-blue text-white' : 'bg-zinc-200 text-zinc-600'}`}
        >
          ثبت دیدگاه
        </button>
      </div>
    </>
  );
}
