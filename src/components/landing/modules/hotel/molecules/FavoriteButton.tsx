'use client';

import Cookies from 'js-cookie';
import { Heart } from 'iconsax-react';
import { useEffect, useState } from 'react';

import { axiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import { generalInstance } from '@/utils/services';

import AuthGuardReaction from '../../best-hotels/molecules/Favorite-hotel/AuthGuardReaction';
import FavoriteHotelReaction from '../../best-hotels/molecules/Favorite-hotel/FavoriteHotelReaction';

type Props = { hotelSlug: string };
type ApiResponse = { data: { id: number } };
type ReactionType = 'saved' | 'unsaved' | 'fail';

// -------------------------------------

export default function FavoriteButton(props: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [guardIsOpen, setGuardIsOpen] = useState(false);

  const [reactionOpen, setReactionOpen] = useState(false);
  const [reactionType, setReactionType] = useState<ReactionType>('fail');

  const { data } = useQuery<ApiResponse>({
    queryKey: ['hotel-information'],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${props.hotelSlug}/introduction`),
  });

  const hotelId = data?.data.id;

  // === Handle Set Reaction-Type
  function handleSetReaction(type: ReactionType, isOpen: boolean) {
    setReactionType(type);
    setReactionOpen(isOpen);
  }

  // === Run on first-render
  useEffect(() => {
    async function fetchData() {
      const userIsLoggedIn = Cookies.get('auth');
      if (!userIsLoggedIn) {
        setGuardIsOpen(true);
        return;
      }

      try {
        const response = await axiosInstance({
          url: `/favorite/favorites/${hotelId}/status/?type=hotel`,
          headers: { 'Content-Type': 'application/json' },
        });

        setIsFavorite(response?.data.is_favorited);
      } catch (error) {
        console.error(error);
      }
    }

    hotelId && fetchData();
  }, [hotelId]);

  // === Handle Click On Favorite-Button
  async function handleClick() {
    const userIsLoggedIn = Cookies.get('auth');
    if (!userIsLoggedIn) {
      setGuardIsOpen(true);
      return;
    }

    try {
      const response = await axiosInstance({
        url: `/favorite/favorites/${hotelId}/status/?type=hotel`,
        method: 'PUT',
        data: { is_favorited: !isFavorite },
        headers: { 'Content-Type': 'application/json' },
      });

      const isActive = response?.data.is_favorited;

      setIsFavorite(isActive);
      isActive
        ? handleSetReaction('saved', true)
        : handleSetReaction('unsaved', true);
    } catch (error) {
      handleSetReaction('fail', true);
    }
  }

  return (
    <>
      <AuthGuardReaction isOpen={guardIsOpen} setOpen={setGuardIsOpen} />
      <FavoriteHotelReaction
        reactionType={reactionType}
        setOpen={setReactionOpen}
        isOpen={reactionOpen}
      />

      <motion.button
        className={`relative w-11 aspect-square flex-center overflow-hidden rounded-lg transition-all duration-300 ease-in-out ${isFavorite ? 'bg-cs-red/10' : 'bg-zinc-200/50'}`}
        onClick={handleClick}
      >
        <AnimatePresence>
          {isFavorite ? (
            <FavoriteIcon key={'is-favorite'} color={'#F30F26'} />
          ) : (
            <FavoriteIcon key={'not-favorite'} color={'#666'} />
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

// -------------------------------------

function FavoriteIcon({ color }: { color: string }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="absolute pointer-events-none"
    >
      <Heart size="22" variant="Bold" color={color} />
    </motion.span>
  );
}
