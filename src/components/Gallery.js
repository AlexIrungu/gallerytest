import React, { useState, useMemo } from "react";
import { importAllMedia } from './utils/utils'; // Import from utils.js
import imageData from './imageData.json';

function Gallery() {
  const media = useMemo(() => importAllMedia(
    require.context("./assets", false, /\.(png|jpe?g|svg|mp4)$/)
  ), []); // Use useMemo to avoid unnecessary computations

  const images = media.filter((value) => !value.endsWith(".mp4"));

  // Create a map from filename to description, breed, and path
  const imageMap = {};
  imageData.forEach((item) => {
    if (item.filename) {
      imageMap[item.filename] = {
        description: item.description,
        breed: item.breed,
        path: item.path
      };
    }
  });

  console.log('imageMap:', imageMap); // Log the imageMap for debugging
  console.log('media:', media); // Log the media for debugging

  images.forEach((value) => {
    const filename = value.split('/').pop();
    if (!imageMap[filename]) {
      console.error(`No matching entry in imageMap for ${filename}`);
    }
  });

  return (
    <div className="container mx-auto p-8">
      <div className="gallery-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((value) => {
  const filename = value.split('/').pop(); // Extract filename from path
  const imageInfo = imageMap[filename];

  console.log('filename:', filename); // Log the filename
  console.log('imageInfo:', imageInfo); // Log the imageInfo

  if (!imageInfo) {
    console.error(`No matching entry in imageMap for ${filename}`); // Log error for missing entries
    return null;
  }

          return (
            <ImageItem
              key={value}
              imageSource={value}
              breed={imageInfo.breed}
              description={imageInfo.description}
            />
          );
        })}
      </div>
    </div>
  );
}

function ImageItem({ imageSource, breed, description }) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="gallery-item relative overflow-hidden rounded-lg shadow-md cursor-pointer">
      <img
        src={imageSource}
        alt={breed}
        className="w-full h-auto max-h-80 object-cover"
        onClick={toggleDescription}
        loading="lazy" // Enable lazy loading
      />
      {showDescription && (
        <div className="gallery-description absolute inset-0 bg-black opacity-75 flex items-center justify-center">
          <div className="text-white text-center text-sm font-bold">
            {breed}: {description}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
