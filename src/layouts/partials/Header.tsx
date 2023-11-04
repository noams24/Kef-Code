import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import React from "react";
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Login from "@/components/Login";
//import { UserAccountNav } from '@/components/UserAccountNav'
//  child navigation link interface
export interface IChildNavigationLink {
  name: string;
  url: string;
}

// navigation link interface
export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;

  return (
    <header
      className="header z-30 h-[11vh] sticky top-0 border-b border-gray-400"
    >
      <nav className="navbar container">
        {/* logo */}
        <div className="order-2">
          <Logo />
        </div>
        <ul
          id="nav-menu"
          className="navbar-nav order-1 hidden w-full lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8"
        >
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`nav-link inline-flex items-center active ${menu.children?.map(({ url }) => url) ||
                      menu.children
                        ?.map(({ url }) => `${url}/`)
                      }`}
                  >
                    {menu.name}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {menu.children?.map((child, i) => (
                      <li className="nav-dropdown-item text-right" key={`children-${i}`}>
                        <Link
                          href={child.url}
                          className={`nav-dropdown-link block`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    href={menu.url}
                    className={`nav-link block`}
                  >
                    {menu.name}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
          {navigation_button.enable && (
            <li className="mt-4 inline-block lg:hidden">
              <Link
                className="btn btn-outline-primary btn-sm"
                href={navigation_button.link}
              >
                {navigation_button.label}
              </Link>
            </li>
          )}
        </ul>
        {/*Left side of the navbar */}
        <div className="order-0 mr-10 flex items-center md:order-0 lg:ml-0">
          <Login />
          <ThemeSwitcher className="ml-5" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
