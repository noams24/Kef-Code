"use client";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";
// import { useState } from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
import ImageFullScreen from "./ImageFullscreen";

const ImageDisplay = ({ imageUrl }: any) => {
  // const theme = useTheme();
  // const [color, setColor] = useState(theme.theme);

  // const handleClick = () => {
  //   color === "light" ? setColor("dark") : setColor("light");
  // };

  return (
    <div className="flex">
      {/* <button onClick={handleClick} className="sticky h-3 w-4 top-0 pr-7">
        {color === "light" ? (
          <Sun className="absolute h-[1.2rem] w-[1.2rem]"/>
        ) : (
          <Moon className="absolute h-[1.2rem] w-[1.2rem]" />
        )}
      </button> */}

      <TransformWrapper>
        <TransformComponent>
          <div>
            <Image
              className="object-cover rounded-md dark:invert opacity-0 transition-opacity duration-[1s]"
              height={800}
              width={800}
              src={imageUrl}
              alt="Image"
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
      <div className="pl-2">
        <ImageFullScreen imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default ImageDisplay;
