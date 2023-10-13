import React, { useState } from "react";
import useInput from "@/hooks/useInput";
import {
  adminDeleteBundle,
  adminUpdateBundle,
  adminUpdateBundleImages,
} from "@/api/admin";

export default function useUpdateBundle() {
  const [description, setBundleDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [newPreviewImages, setNewPreviewImages] = useState<string[]>([]);

  const [name, onChangeName, setName] = useInput("");
  const [startDate, onChangeStartDate, setStartDate] = useInput("");
  const [endDate, onChangeEndDate] = useInput("");
  const [startHour, onChangeStartHour, setStartHour] = useInput("");
  const [startMinute, onChangeStartMinute, setStartMinute] = useInput("");
  const [startSecond, onChangeStartSecond, setStartSecond] = useInput("");
  const [bundleId, setBundleId] = useState<number>();
  const [visible, setVisible] = useState(false);
  // const [description, onChangeDescription] = useInput("");

  console.log(previewImages);
  interface Bundle {
    id: number;
    name: string;
    imageUrls: string;
    description: string;
    saleStartTime: string;
    visible: boolean;
  }
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null); // 선택된 카테고리 상태 추가

  const handleBundleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBundleDescription(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...images];
      const newPreviews: string[] = [...newPreviewImages];

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(file);
            newPreviews.push(reader.result as string);

            setImages(newImages.slice(0, 5)); // 최대 3개까지만 유지
            setNewPreviewImages(newPreviews.slice(0, 5));
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };

  const updateBundle = async () => {
    try {
      const shouldCreate = window.confirm("세트상품을 수정하시겠습니까?");

      if (shouldCreate) {
        const data = await adminUpdateBundle(bundleId, {
          name,
          startDate,
          // endDate,
          startHour,
          startMinute,
          startSecond,
          description,
          visible,
        });
        if (data) {
          console.log(data);
          setBundleId(data.data.id);
          console.log(data.data.id);
        }
        alert("세트 수정을 성공했습니다");
      } else {
        alert("세트 수정을 취소했습니다");
      }
    } catch (err) {
      console.error("세트 수정 중 오류 발생:", err);
    }
  };

  const updateBundleImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < images.length; i += 1) {
      formData.append("images", images[i]);
    }

    try {
      const shouldCreate = window.confirm(
        "세트상품의 이미지를 수정하시겠습니까?",
      );

      if (shouldCreate) {
        // 서버로 FormData를 포함한 POST 요청 보내기
        const data = await adminUpdateBundleImages(bundleId, formData);
        console.log(data);
        alert("세트 이미지 수정을 성공했습니다");
      } else {
        alert("세트 이미지 수정을 취소했습니다");
      }
    } catch (error) {
      // 오류 처리
      console.error("이미지 업로드 오류:", error);
    }
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisible(e.target.checked);
  };

  const handleBundleClick = (bundle: Bundle) => {
    setSelectedBundle(bundle); // 목록에서 카테고리 선택
    console.log(selectedBundle);
    setName(bundle.name);

    const [date, time] = bundle.saleStartTime.split("T");
    const [hour, minute, second] = time.split(":");

    setStartDate(date);
    setStartHour(hour);
    setStartMinute(minute);
    setStartSecond(second);
    setBundleId(bundle.id);

    setVisible(bundle.visible);
    setBundleDescription(bundle.description);

    if (bundle.imageUrls) {
      const imageUrlsArray = bundle.imageUrls
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      setPreviewImages(imageUrlsArray);
    }

    // imageUrls를 배열로 변환
  };

  const deleteBundle = async () => {
    try {
      const shouldCreate = window.confirm(
        `'${selectedBundle?.name}'을 삭제하시겠습니까? `,
      );

      if (shouldCreate) {
        const data = await adminDeleteBundle(bundleId);
        console.log(data);
        alert("세트 삭제를 성공했습니다");
      } else {
        alert("세트 삭제가 취소되었습니다");
      }
    } catch (error) {
      console.error("세트 삭제 중 오류 발생:", error);
      alert("세트에 속한 상품이 있어서 삭제가 불가합니다.");
    }
  };

  return {
    setBundleDescription,
    description,
    images,
    setImages,
    previewImages,
    newPreviewImages,
    setPreviewImages,
    handleBundleDescriptionChange,
    handleImageUpload,
    updateBundle: updateEvent,
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
    updateBundleImages,
    handleVisibleChange: handleEventChange,
    handleBundleClick,
    selectedBundle,
    deleteEvent: deleteBundle,
  };
}
