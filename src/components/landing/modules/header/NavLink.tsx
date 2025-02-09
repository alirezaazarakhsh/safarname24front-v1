import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

// --------------------------------------

export default function NavLink(props: NavLinkProps) {
  const { href, children } = props;

  const pathname = usePathname();
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} className={clsx('nav-link', { active: isActive })}>
      {children}
    </Link>
  );
}
