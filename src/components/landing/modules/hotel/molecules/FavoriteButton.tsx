'use client';

import Cookies from 'js-cookie';
import { useState } from 'react';
import { Heart } from 'iconsax-react';
import { AnimatePresence, motion } from 'framer-motion';

import AuthGuardReaction from '../../best-hotels/molecules/Favorite-hotel/AuthGuardReaction';
import FavoriteHotelReaction from '../../best-hotels/molecules/Favorite-hotel/FavoriteHotelReaction';

type ReactionType = 'saved' | 'unsaved' | 'fail';

// -------------------------------------

export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [guardIsOpen, setGuardIsOpen] = useState(false);

  const [reactionOpen, setReactionOpen] = useState(false);
  const [reactionType, setReactionType] = useState<ReactionType>('fail');

  // ==== Handle Set Reaction-Type
  function handleSetReaction(type: ReactionType, isOpen: boolean) {
    setReactionType(type);
    setReactionOpen(isOpen);
  }

  // ==== Handle Click On Favorite-Button
  function handleClick() {
    const userIsLoggedIn = Cookies.get('AUTH');
    if (!userIsLoggedIn) {
      setGuardIsOpen(true);
      return;
    }

    if (isFavorite) {
      setIsFavorite(false);
      handleSetReaction('unsaved', true);
    } else {
      setIsFavorite(true);
      handleSetReaction('saved', true);
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
