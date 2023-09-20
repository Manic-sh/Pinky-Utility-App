import React from "react";

interface HeaderProps {
  imageUrl: string;
  altText: string;
}

const BharatPayImageHeader: React.FC<HeaderProps> = ({ imageUrl, altText }) => {
  return (
    <div className="d-flex justify-content-end py-2">
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

export default BharatPayImageHeader;
