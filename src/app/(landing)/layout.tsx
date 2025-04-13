import { Header } from '@/components/landing/shared';
import { Footer } from '@/components/landing/shared';

import { ComingSoon } from '@/components/landing/modules/coming-soon';
import UserAccount from '@/components/landing/shared/auth/UserAccount';
import { NavigationBar } from '@/components/landing/shared/navigation-bar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const comingSoonIsActive = false;

// --------------------------------------------

export default function LandingLayout(props: Props) {
  if (comingSoonIsActive) return <ComingSoon />;

  return (
    <>
      <UserAccount />

      <main className="max-w-screen-template min-h-dvh mx-auto">
        <Header />
        <section className="mb-20 mx-5">{props.children}</section>
        <NavigationBar />
        <Footer />
      </main>
    </>
  );
}
