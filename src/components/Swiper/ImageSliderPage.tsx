// ImageSliderPage.js

import React from "react";
import ImageSwiper from "./index"; // ImageSwiper 컴포넌트 경로를 수정해야 할 수도 있습니다.

// 이미지 데이터를 받을 타입 정의
interface ImageSliderPageProps {
  images: string[];
  alt: string;
}

const ImageSliderPage: React.FC<ImageSliderPageProps> = function ({
  images,
  alt,
}) {
  return (
    <div>
      <ImageSwiper images={images} alt={alt} />
    </div>
  );
};

export default ImageSliderPage;
