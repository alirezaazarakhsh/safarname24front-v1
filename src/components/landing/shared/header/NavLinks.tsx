import NavLink from './NavLink';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
  order: number;
  title: string;
  page: { path: string };
};

type ApiResponse = {
  data: Data[];
};

// --------------------------------------

export default function NavLinks() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['header-menus'],
    queryFn: () => generalInstance('/config/header-menus'),
  });

  return (
    <nav className="flex-center">
      {status === 'pending' ? (
        <div className="flex-center gap-5">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="w-20 h-6" />
            ))}
        </div>
      ) : (
        data?.data.map((nav, index) => (
          <NavLink key={index} href={nav.page.path}>
            {nav.title}
          </NavLink>
        ))
      )}
    </nav>
  );
}
