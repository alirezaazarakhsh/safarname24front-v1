import { Heart } from 'iconsax-react';
import { motion } from 'framer-motion';

// -----------------------------

export function FavoriteIcon({ color }: { color: string }) {
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
