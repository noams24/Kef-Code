"use client";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

const TiltedImage = ({}) => {
  return (
    <Tilt>
      <Image src="/images/hero.png" width={600} height={600} alt="" />
    </Tilt>
  );
};

export default TiltedImage;
