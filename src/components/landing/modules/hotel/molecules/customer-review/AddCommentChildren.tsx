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
import cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

import { useAddCommentContext } from '@/context/AddCommentContext';
import { generalInstance } from '@/utils/services';
import SendTicketReaction from '../../../contact-us/molecules/SendTicketReaction';
import axios from 'axios';

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

  // === Set Form-Validation
  useEffect(() => {
    star && description ? setFormValid(true) : setFormValid(false);
  }, [star, description]);

  // axios.create({
  //   baseURL: 'https://cps.safarnameh24.com/api/v1/',
  // });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: Form) => {
      const response = await axios({
        url: `http://cps.safarnameh24.com/api/v1/hotel/hotels/${hotelSlug}/comments/create/`,
        method: 'POST',
        data: values,
      });

      console.log(response);

      // return generalInstance({
      //   data: values,
      //   method: 'POST',
      //   url: '/hotel/hotels/${hotelSlug}/comments/create',
      // });
    },
    onError: (error) => {
      console.log(error);
      handleSetReaction('fail', true);
    },
    onSuccess: () => {
      handleSetReaction('success', true);
    },
  });

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
        id,
        rating: value,
      })),
    };

    console.log(formData);
    // console.log(cookies.get('sessionid'));
    // mutate(formData);

    const localStorageItem = localStorage.getItem('AUTH_VALUE');
    const parsedLocalStorageItem =
      localStorageItem && JSON.parse(localStorageItem).accessUID;
      console.log(parsedLocalStorageItem)

    const response = await axios({
      url: `https://cps.safarnameh24.com/api/v1/hotel/hotels/${hotelSlug}/comments/create/`,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${parsedLocalStorageItem}`,
      },
    });

    console.log(response);
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
