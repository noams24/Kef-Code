import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";

import React from "react";
import Login from "@/components/Login";
import NavMenu from "@/components/NavMenu";

const Header = () => {
  return (
    <header className="header z-30 h-20 sticky top-0 border-b border-gray-400">
      <nav className="navbar container">
        {/* logo */}
        <div className="order-2">
          <Logo />
        </div>
        <NavMenu />
        {/*Left side of the navbar */}
        <div className="order-0 flex items-center md:order-0 lg:ml-0">
          <Login />
          <ThemeSwitcher className="ml-5" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
