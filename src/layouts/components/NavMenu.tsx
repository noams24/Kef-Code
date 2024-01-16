'use client'
import React, { useState, useEffect, useRef} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from "@mui/icons-material/Close";
import menu from "@/config/menu.json";
import MenuItem from "@/components/MenuItem";

export interface IChildNavigationLink {
  name: string;
  url: string;
}

export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const NavMenu = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { main }: { main: INavigationLink[] } = menu;
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev=>!prev);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        toggleDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <nav className={` ${isMobile ? "flex justify-start order-1 relative pr-6" : "order-1 pr-14"}`} >
      {isMobile ? (
        <button onClick={toggleDropdown}>
          {isDropdownOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      ) : (
        <ul id="nav-menu" className="navbar-nav flex w-auto space-x-2 pb-0 xl:space-x-8">
          {main.map((menu, i) => (
            <MenuItem key={`menu-${i}`} menu={menu} />
          ))}
        </ul>
      )}
      {isMobile && isDropdownOpen && (
        <div className="absolute top-12 -left-12 z-50 bg-white dark:bg-darkmode-body p-4 border rounded shadow" ref={wrapperRef}>
          <ul id="nav-menu" className={`navbar-nav flex flex-col w-auto space-x-2 pb-0 xl:space-x-8`} onClick={toggleDropdown}>
            {main.map((menu, i) => (
              <MenuItem key={`menu-${i}`} menu={menu} />
            ))}
          </ul>
        </div>
      )}
      
    </nav>
  );
};

export default NavMenu;
