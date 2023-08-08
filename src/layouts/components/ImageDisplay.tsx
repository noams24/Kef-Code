import React from 'react';

const ImageDisplay = ({ imageUrl } : any) => {
  return <div className="flex justify-center max-h-fit max-w-fit"> <img src={imageUrl} alt="Image" /> </div>;
};

export default ImageDisplay;