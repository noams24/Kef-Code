import Logo from '@/components/Logo';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Login from '@/components/Login';
import NavMenu from '@/components/NavMenu';
import Notifications from '@/components/topBar/Notifications';
import { getAuthSession } from '@/lib/auth';

const Header = async () => {
  const session = await getAuthSession();

  return (
    <header className="header sticky top-0 z-30 h-20 border-b border-gray-400">
      <nav className="navbar container">
        {/* logo */}
        <div className="order-2">
          <Logo />
        </div>
        <NavMenu />
        {/*Left side of the navbar */}
        <div className="order-0 flex items-center gap-x-3 md:order-0 lg:ml-0">
          <Login />
          {session && <Notifications />}
          <ThemeSwitcher className="mx-2" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
