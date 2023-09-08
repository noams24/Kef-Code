import Image from "next/image";

const ImageDisplay = ({ imageUrl }: any) => {
  return (
    <Image
      className="max-h-[20rem] max-w-[45rem] object-cover rounded-md transition-opacity opacity-0 duration-[1s]"
      height={500}
      width={500}
    //   layout='fill'
    // objectFit='contain'
      src={imageUrl}
      alt="Image"
      onLoadingComplete={(image) => image.classList.remove("opacity-0")}
    />
  );
};

export default ImageDisplay;
