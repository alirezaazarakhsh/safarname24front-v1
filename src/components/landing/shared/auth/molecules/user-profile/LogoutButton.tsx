import useLogout from '@/hooks/dashboard/useLogout';

// --------------------------------------------

export default function LogoutButton() {
  const logout = useLogout();
  return (
    <button
      className={
        'text-zinc-600 text-[0.75rem] font-semibold px-4 py-3 flex items-center justify-start gap-2 rounded-md transition-colors ease-in-out hover:bg-zinc-100/60'
      }
      disabled={logout.loading}
      onClick={logout.mutate}
    >
      خروج از حساب کاربری
    </button>
  );
}
