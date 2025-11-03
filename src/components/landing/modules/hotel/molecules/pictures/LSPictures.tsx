import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import DImageGallery from '../pictures-gallery/LSPicturesGallery';

type Props = {
  hotelSlug: string;
  isLoading: boolean;
  pictures: string[];
};

// --------------------------------

export default function LSPictures(props: Props) {
  const { pictures, isLoading, hotelSlug } = props;

  return (
    <div className="h-96 hidden grid-cols-2 gap-6 xl:grid">
      {isLoading ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="rounded-2xl" />
              ))}
          </div>

          <Skeleton className="rounded-2xl" />
        </>
      ) : (
        <>
          {/* === 4*4 */}
          <div className="grid grid-cols-2 gap-4">
            {pictures?.slice(1).map((picture, index) => (
              <div
                key={picture + index}
                className="bg-zinc-200 relative select-none rounded-2xl overflow-hidden"
              >
                {picture && (
                  <Image
                    fill
                    src={picture}
                    alt="hotel-picture"
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          {/* === 1*1 */}
          <div className="bg-zinc-200 relative select-none rounded-2xl overflow-hidden">
            {pictures[0] && (
              <Image
                fill
                src={pictures[0]}
                alt="hotel-picture"
                className="object-cover"
              />
            )}

            <DImageGallery hotelSlug={hotelSlug} />
          </div>
        </>
      )}
    </div>
  );
}
