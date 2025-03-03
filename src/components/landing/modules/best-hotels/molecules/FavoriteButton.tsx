'use client';

import { useState } from 'react';
import { Heart } from 'iconsax-react';
import { AnimatePresence, motion } from 'framer-motion';

// -------------------------------------

export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.button
      className={`absolute top-3 left-3 w-9 h-9 flex-center backdrop-blur-lg overflow-hidden rounded-lg transition-all duration-300 ease-in-out ${isFavorite ? 'bg-white/40' : 'bg-white/20'}`}
      onClick={() => setIsFavorite((prevValue) => !prevValue)}
    >
      <AnimatePresence>
        {isFavorite ? (
          <FavoriteIcon key={'is-favorite'} color={'white'} />
        ) : (
          <FavoriteIcon key={'not-favorite'} color={'rgba(255,255,255,0.5)'} />
        )}
      </AnimatePresence>
    </motion.button>
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
