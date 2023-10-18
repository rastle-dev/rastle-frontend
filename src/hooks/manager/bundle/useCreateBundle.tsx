import React, { useState } from "react";
import useInput from "@/hooks/useInput";
import { adminAddBundleImages, adminCreateBundle } from "@/api/admin";

export default function useCreateBundle() {
  const [blockButton, setBlockButton] = useState(false);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [name, onChangeName] = useInput("");
  const [startDate, onChangeStartDate] = useInput("");
  const [endDate, onChangeEndDate] = useInput("");
  const [startHour, onChangeStartHour] = useInput("");
  const [startMinute, onChangeStartMinute] = useInput("");
  const [startSecond, onChangeStartSecond] = useInput("");
  const [showImageUpload, setshowImageUpload] = useState(false);
  const [bundleId, setBundleId] = useState<number>();
  const [visible, setVisible] = useState(false);

  interface Bundle {
    id: number;
    name: string;
    imageUrls: string[];
    description: string;
    saleStartTime: string;
    visible: boolean;
  }
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null); // 선택된 카테고리 상태 추가

  const handleBundleDescriptionChange = (
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

  const createBundle = async () => {
    if (
      name.length > 0 &&
      startDate.match(/^\d{4}-\d{2}-\d{2}$/) &&
      Number(startHour) >= 0 &&
      Number(startHour) < 24 &&
      Number(startMinute) >= 0 &&
      Number(startMinute) < 60 &&
      Number(startSecond) >= 0 &&
      Number(startSecond) < 60
    ) {
      try {
        const data = await adminCreateBundle({
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
          setBundleId(data.data.id);
          setshowImageUpload(true);
          setBlockButton(true);
          alert("세트가 추가되었습니다. 이미지를 추가해주세요");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("세트 필수항목을 올바르게 채워주세요");
    }
  };

  const addBundleImages = async () => {
    if (images.length === 0) {
      // images 배열이 비어있으면 아무 작업도 수행하지 않습니다.
      alert("이미지를 하나 이상 추가해주세요");
      return;
    }

    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < images.length; i += 1) {
      formData.append("images", images[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminAddBundleImages(bundleId, formData);

      // 서버 응답 처리
      console.log(data);
      alert("세트 이미지 추가를 성공했습니다");
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      // 오류 처리지
      alert("세트 이미지 추가 오류");
      console.error("이미지 업로드 오류:", error);
    }
  };

  const handleVisibleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisible(e.target.checked);
  };

  const handleBundleClick = (bundle: Bundle) => {
    setSelectedBundle(bundle); // 목록에서 카테고리 선택
    console.log(selectedBundle);
  };

  return {
    setCategoryDescription: setDescription,
    description,
    images,
    setImages,
    previewImages,
    setPreviewImages,
    handleBundleDescriptionChange,
    handleImageUpload,
    createBundle,
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
    addBundleImages,
    handleVisibleChange,
    handleBundleClick,
    blockButton,
  };
}
