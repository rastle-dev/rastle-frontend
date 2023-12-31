import React from "react";
import styled from "styled-components";
import useCreateEvent from "@/hooks/manager/event/useCreateEvent";
import Input from "@/components/Common/Input";
import Image from "next/image";
import COLORS from "@/constants/color";

const Title = styled.div`
  margin: 0;
  font-size: 2.2rem;
  padding-bottom: 2rem;
`;

const CategoryDetail = styled.div`
  margin: 0;
  padding-bottom: 1rem;

  label {
    margin-right: 0.5rem;
  }
`;

const CustomTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const PreviewImages = styled.div`
  margin-top: 1rem;
`;

const EventCheckbox = styled.input`
  margin-right: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledButton = styled.button`
  font-size: 1.18182rem;
  font-weight: 400;
  padding: 1rem;
  border: 0.1px solid ${COLORS.GREY.상세페이지};
  background-color: white;
  cursor: pointer;
  margin-bottom: 1rem;
  &:hover {
    font-weight: 500;
  }

  /* 버튼이 클릭된 상태일 때의 스타일 */
`;

export default function CreateEvent() {
  const {
    description,
    previewImages,
    handleEventDescriptionChange,
    handleImageUpload,
    onChangeName,
    onChangeStartDate,
    onChangeStartHour,
    onChangeStartMinute,
    onChangeStartSecond,
    createEvent,
    showImageUpload,
    addEventImages,
    handleVisibleChange,
    onChangeEndDate,
    onChangeEndHour,
    onChangeEndMinute,
    onChangeEndSecond,
    blockCreateEventButton,
  } = useCreateEvent();

  return (
    <div>
      <Title>이벤트 추가</Title>
      <CategoryDetail>
        <Input label="이벤트 이름" size={30} onChange={onChangeName} />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="시작 날짜"
          placeholder="2023-08-23형식"
          size={30}
          onChange={onChangeStartDate}
        />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="시작 hour(string)"
          placeholder="12"
          size={30}
          onChange={onChangeStartHour}
        />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="시작 minute(string)"
          placeholder="00"
          size={30}
          onChange={onChangeStartMinute}
        />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="시작 second(string)"
          placeholder="00"
          size={30}
          onChange={onChangeStartSecond}
        />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="종료 날짜"
          placeholder="2023-08-23형식"
          size={30}
          onChange={onChangeEndDate}
        />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="종료 hour(string)"
          placeholder="12"
          size={30}
          onChange={onChangeEndHour}
        />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="종료 minute(string)"
          placeholder="00"
          size={30}
          onChange={onChangeEndMinute}
        />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="종료 second(string)"
          placeholder="00"
          size={30}
          onChange={onChangeEndSecond}
        />
      </CategoryDetail>
      공개:
      <EventCheckbox type="checkbox" onChange={(e) => handleVisibleChange(e)} />
      <CategoryDetail>
        이벤트 설명:
        <CustomTextarea
          id="categoryDescription"
          value={description}
          onChange={(e) => handleEventDescriptionChange(e)}
        />
      </CategoryDetail>
      <StyledButton onClick={createEvent} disabled={blockCreateEventButton}>
        이벤트 생성
      </StyledButton>
      {showImageUpload ? (
        <div>
          이벤트 이미지:
          <input
            type="file"
            id="categoryImage"
            accept="image/*"
            multiple // 여러 이미지 업로드 가능하도록
            onChange={handleImageUpload}
          />
          <PreviewImages>
            {previewImages?.map((preview, index) => (
              <Image
                key={preview}
                src={preview}
                alt={`미리보기 이미지 ${index}`}
                width={200} // 이미지 너비
                height={250} // 이미지 높이
                style={{ margin: "5px" }}
              />
            ))}
          </PreviewImages>
          <StyledButton onClick={addEventImages}> 이미지 추가</StyledButton>
        </div>
      ) : null}
    </div>
  );
}
