"use client";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

const TiltedImage = ({}) => {
  return (
    <div className="sm:pt-10 sm:max-w-[380px] md:max-w-max">
    <Tilt>
      <Image src="/images/hero.png" width={600} height={600} alt="" />
    </Tilt>
    </div>
  );
};

export default TiltedImage;
