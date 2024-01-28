"use client";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

const TiltedImage = ({}) => {
  return (
    <Tilt

    >
      <Image src="/images/hero.png" width={500} height={500} alt="" />
    </Tilt>
  );
};

export default TiltedImage;
