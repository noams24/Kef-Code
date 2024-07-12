import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface LogoProps {
  isSmall?: boolean;
}

const Logo: FC<LogoProps> = ({ isSmall }) => {
  // const scrollToTop = () => {
  //   window.scrollTo(0, 0);
  // };

  return (
    // <Link href="/" className="navbar-brand inline-block" onClick={scrollToTop}>
    <Link href="/" className="navbar-brand inline-block shrink-0">
      <Image
        width={'50'}
        height={'50'}
        src={'/images/logo1.png'}
        style={{
          width: isSmall ? '35px' : '50px',
          height: isSmall ? '35px' : '50px',
        }}
        alt={'logo'}
        priority
      />
    </Link>
  );
};

export default Logo;
