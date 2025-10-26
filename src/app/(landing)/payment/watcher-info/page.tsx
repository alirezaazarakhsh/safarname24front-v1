import { WatcherInfo as Info } from '@/components/landing/modules/payment/organisms';

// ------------------------------

export default function WatcherInfo() {
  return (
    <>
      {/* === Small-Screen */}
      <div className="space-y-6 lg:hidden">
        <Info />
      </div>

      {/* === Large-Screen */}
      <div className="hidden grid-cols-[1fr_2.8fr] gap-x-6 overflow-hidden lg:grid">
        {/* --- Right-Column */}
        <div className="space-y-6">
          <Info />
        </div>

        {/* --- Left-Column */}
        <div className="space-y-6"></div>
      </div>
    </>
  );
}
