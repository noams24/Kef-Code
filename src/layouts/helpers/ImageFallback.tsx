/* eslint-disable jsx-a11y/alt-text */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ImageFallback = (props: any) => {
  const { src, fallback, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallback);
      }}
      onLoad={(img) => img.currentTarget.classList.remove("opacity-0")}
    />
  );
};

export default ImageFallback;
