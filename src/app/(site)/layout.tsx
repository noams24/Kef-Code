import config from "@/config/config.json";
import theme from "@/config/theme.json";
import TwSizeIndicator from "@/helpers/TwSizeIndicator";
// import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import { Toaster } from '@/components/ui/Toaster'
import Birzia from 'next/font/local';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic'

import "@/styles/main.scss";
const FirstTime = dynamic(() => import('@/components/modals/FirstTime'), {
  ssr: false,
});

const birzia = Birzia({
  src: [
    {
      path: '../../../public/fonts/Birzia-Black.woff2',
      weight: '900',
    },
    {
      path: '../../../public/fonts/Birzia-Bold.woff2',
      weight: '700',
    },
    {
      path: '../../../public/fonts/Birzia-Medium.woff2',
      weight: '500',
    },
  ],
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        {/* <link rel="shortcut icon" href={"/images/kefcodelogo.png"} />  */}
        <link rel="shortcut icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="kef-code" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />
      </head>
      
      <body className={`${birzia.className} ${inter.variable}`} suppressHydrationWarning={true}>
        <TwSizeIndicator />
        <Providers>
          <Header/>
          <FirstTime />
          <main>{children}</main>
          {/* <Footer/> */}
          <Toaster/>
        </Providers>
      </body>
    </html>
  );
}
