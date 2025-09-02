import { Header } from '@/components/landing/shared';
import { Footer } from '@/components/landing/shared';

import UserAccount from '@/components/landing/shared/auth/UserAccount';
import { NavigationBar } from '@/components/landing/shared/navigation-bar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

// --------------------------------------------

export default function LandingLayout(props: Props) {
  return (
    <>
      <UserAccount />

      <main className="max-w-screen-template mx-auto">
        <Header />
        <section className="mb-20 mx-5">{props.children}</section>
        <NavigationBar />
        <Footer />
      </main>
    </>
  );
}
