'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { axiosInstance } from '@/utils/axios';
import { AnimatePresence, motion } from 'framer-motion';

import { FavoriteIcon } from './FavoriteIcon';
import { AddCollection } from './AddCollection';
import { CollectionList } from './CollectionList';

import { generalInstance } from '@/utils/services';
import AddCollectionButton from './AddCollectionButton';

import { AuthGuardReaction } from './AuthGuardReaction';
import { CollectionWrapper } from './CollectionWrapper';

import useCallReactions from './helpers/useCallReactions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Props = { hotelSlug: string };
type HotelInformation = { data: { id: number } };

// -----------------------------

export function FavoriteButton(props: Props) {
  const [guardIsOpen, setGuardIsOpen] = useState(false);
  const [isAuthenticated, setAuthenticate] = useState(false);

  const [collectionsOpen, setOpenCollection] = useState(false);
  const [addCollectionOpen, setAddCollectionOpen] = useState(false);

  const queryClient = useQueryClient();
  const callReactions = useCallReactions();

  // === Check-Auth
  useEffect(() => {
    setAuthenticate(!!Cookies.get('auth'));
  }, []);

  // === Check Hotel-Collections Length
  const { data: hotelCollections, status } = useQuery({
    queryKey: ['hotel-favorite-collections'],
    queryFn: () => axiosInstance('/favorite/website/collections/'),
  });

  // === Get Hotel-Id
  const { data } = useQuery<HotelInformation>({
    queryKey: ['hotel-information'],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${props.hotelSlug}/introduction`),
  });

  const hotelId = data?.data.id;

  // === Check Favorite-Status
  const { data: favoriteStatus } = useQuery({
    enabled: Boolean(isAuthenticated && hotelId),
    queryKey: ['hotel-favorite-status'],
    queryFn: () =>
      axiosInstance(`/favorite/favorites/${hotelId}/status/?type=hotel`),
  });

  const isFavorite = favoriteStatus?.data.is_favorited;

  // === Open Add-Collection
  function handleOpenAddCollection() {
    setOpenCollection(false);
    setAddCollectionOpen(true);
  }

  // === Unsaved from favorite
  const { mutate } = useMutation({
    mutationFn: () => {
      return axiosInstance.delete(`favorite/items/${hotelId}/?type=hotel`);
    },
    onSuccess: () => {
      callReactions({ type: 'success', context: 'favorite-unsaved' });
      queryClient.refetchQueries({ queryKey: ['hotel-favorite-status'] });
    },
    onError: () => {
      callReactions({ type: 'error', context: 'favorite-unsaved' });
    },
  });

  // === Handle Click
  function handleClick() {
    if (!isAuthenticated) {
      setGuardIsOpen(true);
      return;
    }

    if (status !== 'pending' && !hotelCollections?.data.length) {
      setAddCollectionOpen(true);
      return;
    }

    !isFavorite ? setOpenCollection(true) : mutate();
  }

  return (
    <>
      <CollectionWrapper
        open={collectionsOpen}
        onOpenChange={setOpenCollection}
      >
        <CollectionList
          hotelId={hotelId}
          closeCollectionList={() => setOpenCollection(false)}
        />
        <AddCollectionButton openAddCollection={handleOpenAddCollection} />
      </CollectionWrapper>

      <AddCollection
        open={addCollectionOpen}
        onOpenChange={setAddCollectionOpen}
      />

      <AuthGuardReaction isOpen={guardIsOpen} setOpen={setGuardIsOpen} />

      <motion.button
        onClick={handleClick}
        className={`relative w-11 aspect-square flex-center overflow-hidden rounded-lg transition-all duration-300 ease-in-out ${isFavorite ? 'bg-cs-red/10' : 'bg-zinc-200/50'}`}
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
