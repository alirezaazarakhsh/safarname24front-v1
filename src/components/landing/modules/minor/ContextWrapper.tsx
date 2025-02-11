'use client';

import { useState } from 'react';
import ComingSoon from '../coming-soon/ComingSoon';

type Props = Readonly<{
  children: React.ReactNode;
}>;

// ----------------------------------

export default function ContextWrapper(props: Props) {
  const [comingSoonIsActive, setComingSoonActive] = useState(false);

  return <>{comingSoonIsActive ? <ComingSoon /> : props.children}</>;
}
