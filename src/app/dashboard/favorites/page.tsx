// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Filter from '@/components/dashboard/favorites/filter';
import { ReactNode, useState } from 'react';

// Creating and exporting favorites page as default
export default function FavoritesPage(): ReactNode {
  // Defining states of component
  const [savedType, setSavedType] = useState<'savedHotels' | 'savedBlogs'>(
    'savedHotels',
  );

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <div className="lg:px-0 px-[24px]">
        <Filter onChange={(val) => setSavedType(val)} />
      </div>
    </main>
  );
}
