import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";

const ImageDisplay = ({ imageUrl }: any) => {
  return (
    <TransformWrapper
    >
      <TransformComponent >
    <Image
      className="dark:invert object-cover rounded-md transition-opacity opacity-0 duration-[1s]"
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
