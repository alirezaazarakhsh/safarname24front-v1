import Cookies from 'js-cookie';

// --------------------------------------------

export default function LogoutButton() {
  function handleLogout() {
    Cookies.remove('AUTH');
    window.location.reload();
  }

  return (
    <button
      className="bg-cs-red/10 text-cs-red text-[0.8rem] font-semibold px-4 py-3 flex items-center justify-start gap-2 rounded-md transition-colors ease-in-out lg:bg-transparent lg:text-zinc-600 lg:text-[0.7rem] lg:rounded-none lg:hover:bg-cs-red/10 lg:hover:text-cs-red"
      onClick={handleLogout}
    >
      خروج از حساب کاربری
    </button>
  );
}
