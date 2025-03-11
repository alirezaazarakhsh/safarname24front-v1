import { Header } from '@/components/landing/shared';
import { Footer } from '@/components/landing/shared';
import ComingSoon from '@/components/landing/modules/coming-soon/ComingSoon';
import { NavigationBar } from '@/components/landing/shared/navigation-bar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

// --------------------------------------------

export default function LandingLayout(props: Props) {
  return (
    <>
      {false ? (
        <ComingSoon date="2025-02-20" />
      ) : (
        <>
          <Header />
          <main className="max-w-screen-template min-h-dvh mx-auto">
            <section className="mx-5">{props.children}</section>
            {/* <NavigationBar /> */}
            <Footer />
          </main>
        </>
      )}
    </>
  );
}
