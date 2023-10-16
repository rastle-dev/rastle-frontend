import React, { useState } from "react";
import useInput from "@/hooks/useInput";
import {
  adminDeleteBundle,
  adminDeleteEvent,
  adminUpdateBundle,
  adminUpdateBundleImages,
  adminUpdateEvent,
  adminUpdateEventImages,
} from "@/api/admin";

export default function useUpdateEvent() {
  const [description, setEventDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [newPreviewImages, setNewPreviewImages] = useState<string[]>([]);

  const [name, onChangeName, setName] = useInput("");
  const [startDate, onChangeStartDate, setStartDate] = useInput("");
  const [endDate, onChangeEndDate, setEndDate] = useInput("");
  const [startHour, onChangeStartHour, setStartHour] = useInput("");
  const [startMinute, onChangeStartMinute, setStartMinute] = useInput("");
  const [startSecond, onChangeStartSecond, setStartSecond] = useInput("");
  const [endHour, onChangeEndHour, setEndHour] = useInput("");
  const [endMinute, onChangeEndMinute, setEndMinute] = useInput("");
  const [endSecond, onChangeEndSecond, setEndSecond] = useInput("");
  const [eventId, setEventId] = useState<number>();
  const [visible, setVisible] = useState(false);
  // const [description, onChangeDescription] = useInput("");

  console.log(previewImages);
  interface Event {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    imageUrls: string;
    description: string;
    visible: boolean;
  }
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // 선택된 카테고리 상태 추가

  const handleEventDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEventDescription(e.target.value);
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

  const updateEvent = async () => {
    try {
      const shouldCreate = window.confirm("이벤트 상품을 수정하시겠습니까?");

      if (shouldCreate) {
        const data = await adminUpdateEvent(eventId, {
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
        if (data) {
          console.log(data);
          setEventId(data.data.id);
          console.log(data.data.id);
        }
        alert("이벤트 수정을 성공했습니다");
      } else {
        alert("이벤트 수정을 취소했습니다");
      }
    } catch (err) {
      console.error("이벤트 수정 중 오류 발생:", err);
    }
  };

  const updateEventImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < images.length; i += 1) {
      formData.append("images", images[i]);
    }

    try {
      const shouldCreate = window.confirm(
        "이벤트상품의 이미지를 수정하시겠습니까?",
      );

      if (shouldCreate) {
        // 서버현로 FormData를 포함한 POST 요청 보내기
        const data = await adminUpdateEventImages(eventId, formData);
        console.log(data);
        alert("이벤트 이미지 수정을 성공했습니다");
      } else {
        alert("이벤트 이미지 수정을 취소했습니다");
      }
    } catch (error) {
      // 오류 처리
      console.error("이미지 업로드 오류:", error);
    }
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisible(e.target.checked);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event); // 목록에서 카테고리 선택
    setName(event.name);

    const [newStartdate, newStartTime] = event.startDate.split("T");
    const [newStartHour, newStartMinute, newStartSecond] =
      newStartTime.split(":");

    setStartDate(newStartdate);
    setStartHour(newStartHour);
    setStartMinute(newStartMinute);
    setStartSecond(newStartSecond);

    const [newEnddate, newEndTime] = event.endDate.split("T");
    const [newEndHour, newEndMinute, newEndSecond] = newEndTime.split(":");

    setEndDate(newEnddate);
    setEndHour(newEndHour);
    setEndMinute(newEndMinute);
    setEndSecond(newEndSecond);

    setEventId(event.id);

    setVisible(event.visible);
    setEventDescription(event.description);

    if (event.imageUrls) {
      const imageUrlsArray = event.imageUrls
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      setPreviewImages(imageUrlsArray);
    }

    // imageUrls를 배열로 변환
  };

  const deleteEvent = async () => {
    try {
      const shouldCreate = window.confirm(
        `'${selectedEvent?.name}'을 삭제하시겠습니까? `,
      );

      if (shouldCreate) {
        const data = await adminDeleteEvent(eventId);
        console.log(data);
        alert("이벤트 삭제를 성공했습니다");
      } else {
        alert("이벤트 삭제가 취소되었습니다");
      }
    } catch (error) {
      console.error("세트 삭제 중 오류 발생:", error);
      alert("이벤트 삭제가 불가합니다.");
    }
  };

  return {
    setBundleDescription: setEventDescription,
    description,
    images,
    setImages,
    previewImages,
    newPreviewImages,
    setPreviewImages,
    handleBundleDescriptionChange: handleEventDescriptionChange,
    handleImageUpload,
    updateEvent,
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
    updateBundleImages: updateEventImages,
    handleVisibleChange: handleEventChange,
    handleEventClick,
    selectedBundle: selectedEvent,
    deleteEvent,
    endHour,
    endMinute,
    endSecond,
    onChangeEndHour,
    onChangeEndMinute,
    onChangeEndSecond,
  };
}
