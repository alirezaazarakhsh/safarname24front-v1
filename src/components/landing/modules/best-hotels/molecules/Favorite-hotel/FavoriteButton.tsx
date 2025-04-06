'use client';

import Cookies from 'js-cookie';
import { useState } from 'react';
import { Heart } from 'iconsax-react';
import { AnimatePresence, motion } from 'framer-motion';

import AuthGuardReaction from './AuthGuardReaction';
import FavoriteHotelReaction from './FavoriteHotelReaction';

type ReactionType = 'success' | 'fail';

// -------------------------------------

export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [guardIsOpen, setGuardIsOpen] = useState(false);

  const [reactionOpen, setReactionOpen] = useState(false);
  const [reactionType, setReactionType] = useState<ReactionType>('success');

  function handleSetReaction(type: 'success' | 'fail', isOpen: boolean) {
    setReactionType(type);
    setReactionOpen(isOpen);
  }

  function handleClick() {
    handleSetReaction('fail', true);
    // const userIsLoggedIn = Cookies.get('AUTH');
    // if (!userIsLoggedIn) setGuardIsOpen(true);
  }

  return (
    <>
      <AuthGuardReaction isOpen={guardIsOpen} setOpen={setGuardIsOpen} />
      <FavoriteHotelReaction
        reactionType={reactionType}
        isOpen={reactionOpen}
        setOpen={setReactionOpen}
      />

      <motion.button
        className={`absolute top-3 left-3 w-9 h-9 flex-center backdrop-blur-lg overflow-hidden rounded-lg transition-all duration-300 ease-in-out ${isFavorite ? 'bg-white/40' : 'bg-white/20'}`}
        onClick={handleClick}
      >
        <AnimatePresence>
          {isFavorite ? (
            <FavoriteIcon key={'is-favorite'} color={'white'} />
          ) : (
            <FavoriteIcon
              key={'not-favorite'}
              color={'rgba(255,255,255,0.5)'}
            />
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
      className="absolute"
    >
      <Heart size="22" variant="Bold" color={color} />
    </motion.span>
  );
}
