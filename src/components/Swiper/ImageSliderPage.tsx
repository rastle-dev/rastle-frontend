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

export async function getStaticProps() {
  // 이미지 데이터를 외부 소스에서 가져오는 비동기 로직을 여기에 작성,
  const images: string[] = ["image1.jpg", "image2.jpg", "image3.jpg"]; // 예시 데이터

  return {
    props: {
      images,
    },
  };
}

export default ImageSliderPage;
