"use client";

import config from "@/config/config.json";
// import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
// import { useEffect, useState } from "react";

const Logo = ({ src }: { src?: string }) => {
  // destructuring items from config object
  const {
    logo,
    logo_darkmode,
    logo_width,
    logo_height,
    logo_text,
    title,
  }: {
    logo: string;
    logo_darkmode: string;
    logo_width: any;
    logo_height: any;
    logo_text: string;
    title: string;
  } = config.site;

  // const { theme, resolvedTheme } = useTheme();
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);

  // const resolvedLogo =
  //   mounted && (theme === "dark" || resolvedTheme === "dark")
  //     ? logo_darkmode
  //     : logo;
  // const logoPath = src ? src : resolvedLogo;

const scrollToTop = () => {
  window.scrollTo(0,0)
}

  return (
    <Link href="/" className="navbar-brand inline-block" onClick={scrollToTop}>
        <Image
          width={logo_width}
          height={logo_height}
          src={"/images/logo1.png"}
          style={{
            width: '50px',
            height: '50px',
          }}
          // src={logoPath}
          alt={title}
          priority
        />
    </Link>
  );
};

export default Logo;
