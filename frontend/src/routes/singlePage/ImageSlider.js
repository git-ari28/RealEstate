import React, { useState } from 'react';
import Slider from 'react-slick';
import './Slider.scss'; // Ensure you have the appropriate styles

const ImageSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0); // Start with the first image
  const [isOpen, setIsOpen] = useState(true); // State to control slider visibility

  const handleClose = () => {
    setIsOpen(false); // Close the image slider
    setImageIndex(null); // Set image index to null
  };

  // If the slider is closed, do not render anything
  if (!isOpen) {
    return null; // Optionally, you can return a placeholder or some other component
  }

  return (
    <div className='slider'>
      <div className='fullslider'>
        <div className='arrow' onClick={() => setImageIndex(imageIndex > 0 ? imageIndex - 1 : images.length - 1)}>
          <img src="https://th.bing.com/th/id/OIP.LyHBzgxfW35_OS8zd2dEUgHaI2?rs=1&pid=ImgDetMain" alt="Left Arrow" />
        </div>
        <div className='bigImage'>
          <img src={images[imageIndex]} alt="" />
          <div className="close-button" onClick={handleClose}>
            &times; {/* Close sign */}
          </div>
        </div>
        <div className='arrow' onClick={() => setImageIndex((imageIndex + 1) % images.length)}>
          <img src="https://w1.pngwing.com/pngs/334/468/png-transparent-arrow-icon-forward-icon-navigation-icon-next-icon-right-icon-white-text-logo-line-material-property-symbol-rectangle.png" alt="Right Arrow" />
        </div>
      </div>
      <div className='smallImages'>
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt=""
            key={index}
            onClick={() => setImageIndex(index + 1)} // Set the index to the clicked small image
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;




