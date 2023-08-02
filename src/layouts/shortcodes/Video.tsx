function Video({
  title,
  width = 500,
  height = "auto",
  src,
  ...rest
}: {
  title: string;
  width: number | "auto";
  height: number | "auto";
  src: string;
  [key: string]: any;
}) {
  return (
    <div className="flex justify-center">
    <video
      className="overflow-hidden rounded-lg"
      width={width}
      height={height}
      controls
      {...rest}
    >
      <source
        src={src.match(/^http/) ? src : `/videos/${src}`}
        type="video/mp4"
      />
      {title}
    </video>
    </div>
  );
}

export default Video;
