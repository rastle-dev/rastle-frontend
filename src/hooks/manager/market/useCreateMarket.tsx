import React, { useState } from "react";
import useInput from "@/hooks/useInput";
import {
  adminAddMarketImages,
  adminCreateCategory,
  adminCreateMarket,
} from "@/api/admin";

export default function useCreateMarket() {
  const [description, setCategoryDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [name, onChangeName] = useInput("");
  const [startDate, onChangeStartDate] = useInput("");
  const [endDate, onChangeEndDate] = useInput("");
  const [startHour, onChangeStartHour] = useInput("");
  const [startMinute, onChangeStartMinute] = useInput("");
  const [startSecond, onChangeStartSecond] = useInput("");
  const [showImageUpload, setshowImageUpload] = useState(false);
  const [marketId, setMarketId] = useState<number>();
  // const [description, onChangeDescription] = useInput("");

  const handleCategoryDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCategoryDescription(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...images];
      const newPreviews: string[] = [...previewImages];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(file);
            newPreviews.push(reader.result as string);

            setImages(newImages.slice(0, 5)); // 최대 3개까지만 유지
            setPreviewImages(newPreviews.slice(0, 5));
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };

  const createMarket = async () => {
    try {
      const data = await adminCreateMarket({
        name,
        startDate,
        endDate,
        startHour,
        startMinute,
        startSecond,
        description,
      });
      if (data) {
        console.log(data);
        setMarketId(data.data.id);
        console.log(data.data.id);
        setshowImageUpload(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addMarketImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminAddMarketImages(marketId, formData);

      // 서버 응답 처리
      console.log(data);
    } catch (error) {
      // 오류 처리
      console.error("이미지 업로드 오류:", error);
    }
  };

  return {
    setCategoryDescription,
    description,
    images,
    setImages,
    previewImages,
    setPreviewImages,
    handleCategoryDescriptionChange,
    handleImageUpload,
    createMarket,
    name,
    onChangeName,
    startDate,
    onChangeStartDate,
    endDate,
    onChangeEndDate,
    startHour,
    onChangeStartHour,
    startMinute,
    onChangeStartMinute,
    startSecond,
    onChangeStartSecond,
    showImageUpload,
    addMarketImages,
  };
}
