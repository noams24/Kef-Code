import Image from "next/image";
import { FC } from "react";

interface featuresProps {
  imgUrl: string;
  topText: string;
  children: any;
}

const Features: FC<featuresProps> = ({ imgUrl, topText, children }) => {
  return (
    <div className="border border-zinc-300 rounded-md w-64 h-80 shadow-xl shadow-teal-500/30">
      <div className="-mt-5 flex justify-center items-center">
        <Image src={imgUrl} height={138} width={138} alt="" />
      </div>
      <h3 className="flex justify-center pt-4">{topText}</h3>
      <div className="px-3 pt-3 flex justify-center">
        <p dir="rtl">{children}</p>
      </div>
    </div>
  );
};

export default Features;
