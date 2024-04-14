"use client";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";
import { useState } from "react";

const ImageDisplay = ({ imageUrl }: any) => {
  return (
      <TransformWrapper>
        <TransformComponent>
          <Image
            className= "object-cover rounded-md dark:invert"
            height={500}
            width={500}
            src={imageUrl}
            alt="Image"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </TransformComponent>
      </TransformWrapper>

  );
};

export default ImageDisplay;
