import React, { useState } from "react";
import useInput from "@/hooks/useInput";
import {
  adminAddBundleImages,
  adminAddEventImages,
  adminCreateEvent,
} from "@/api/admin";

export default function useCreateEvent() {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [name, onChangeName] = useInput("");
  const [startDate, onChangeStartDate] = useInput("");
  const [startHour, onChangeStartHour] = useInput("");
  const [startMinute, onChangeStartMinute] = useInput("");
  const [startSecond, onChangeStartSecond] = useInput("");
  const [endDate, onChangeEndDate] = useInput("");
  const [endHour, onChangeEndHour] = useInput("");
  const [endMinute, onChangeEndMinute] = useInput("");
  const [endSecond, onChangeEndSecond] = useInput("");
  const [showImageUpload, setshowImageUpload] = useState(false);
  const [eventId, setEventId] = useState<number>();
  const [visible, setVisible] = useState(false);

  interface Bundle {
    id: number;
    name: string;
    imageUrls: string[];
    description: string;
    saleStartTime: string;
    visible: boolean;
  }

  const handleEventDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...images];
      const newPreviews: string[] = [...previewImages];

      for (let i = 0; i < files.length; i += 1) {
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

  const createEvent = async () => {
    try {
      const data = await adminCreateEvent({
        name,
        startDate,
        endDate,
        startHour,
        startMinute,
        startSecond,
        endHour,
        endMinute,
        endSecond,
        description,
        visible,
      });

      console.log(data);
      if (data) {
        setEventId(data.data.id);
        setshowImageUpload(true);
        alert("이벤트 생성 성공");
      } else {
        alert("이벤트 생성 실패");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addEventImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < images.length; i += 1) {
      formData.append("images", images[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminAddEventImages(eventId, formData);

      // 서버 응답 처리
      console.log(data);
      alert("세트 이미지 추가를 성공했습니다");
    } catch (error) {
      // 오류 처리
      alert("세트 이미지 추가 오류");
      console.error("이미지 업로드 오류:", error);
    }
  };

  const handleVisibleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisible(e.target.checked);
  };

  return {
    setDescription,
    description,
    images,
    setImages,
    previewImages,
    setPreviewImages,
    handleEventDescriptionChange,
    handleImageUpload,
    createEvent,
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
    addEventImages,
    handleVisibleChange,
    endHour,
    endMinute,
    endSecond,
    onChangeEndHour,
    onChangeEndMinute,
    onChangeEndSecond,
  };
}
