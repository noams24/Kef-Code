"use client";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const ImageDisplay = ({ imageUrl }: any) => {
  const [color, setColor] = useState<"light" | "dark">("light");

  const handleClick = () => {
    color === "light" ? setColor("dark") : setColor("light");
  };

  return (
    <div className="flex">
      <button onClick={handleClick} className="sticky h-3 w-4 top-0 pr-7">
        {color === "light" ? (
          <Sun className="absolute h-[1.2rem] w-[1.2rem]"/>
        ) : (
          <Moon className="absolute h-[1.2rem] w-[1.2rem]" />
        )}
      </button>
      <TransformWrapper>
        <TransformComponent>
          <Image
            className={`${
              color === "dark" && "invert"
            } object-cover rounded-md`}
            height={500}
            width={500}
            src={imageUrl}
            alt="Image"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default ImageDisplay;
