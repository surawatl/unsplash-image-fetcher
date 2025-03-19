import React from 'react';

const ImageCard = ({ image }: { image: any }) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="w-full h-48 object-cover"
      />
      {/* <div className="p-4">
        <h2 className="text-lg font-semibold">{image.alt_description || 'Untitled'}</h2>
        <p className="text-sm text-gray-500">By {image.user.name}</p>
      </div> */}
    </div>
  );
};

export default ImageCard;