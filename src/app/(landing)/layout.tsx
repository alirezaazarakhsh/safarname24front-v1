import { Header } from '@/components/landing/shared';
import { Footer } from '@/components/landing/shared';

import UserAccount from '@/components/landing/shared/auth/UserAccount';
import { BottomBar } from '@/components/landing/shared/bottom-bar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

// --------------------------------------------

export default function LandingLayout(props: Props) {
  return (
    <>
      <UserAccount />

      <main className="mx-auto max-w-screen-template">
        <Header />
        <section className="mx-5 mb-20">{props.children}</section>
        <BottomBar />
        <Footer />
      </main>
    </>
  );
}
