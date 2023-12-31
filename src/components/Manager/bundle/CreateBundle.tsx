import React from "react";
import styled from "styled-components";
import useCreateBundle from "@/hooks/manager/bundle/useCreateBundle";
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
  margin-bottom: 2rem;
  &:hover {
    font-weight: 500;
  }

  /* 버튼이 클릭된 상태일 때의 스타일 */
`;

export default function CreateBundle() {
  const {
    description,
    previewImages,
    handleBundleDescriptionChange,
    handleImageUpload,
    onChangeName,
    onChangeStartDate,
    onChangeStartHour,
    onChangeStartMinute,
    onChangeStartSecond,
    createBundle,
    showImageUpload,
    addBundleImages,
    handleVisibleChange,
    blockButton,
  } = useCreateBundle();

  return (
    <div>
      <Title>세트 추가</Title>
      <CategoryDetail>
        <Input label="세트 이름" size={30} onChange={onChangeName} />
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
      공개:
      <EventCheckbox type="checkbox" onChange={(e) => handleVisibleChange(e)} />
      <CategoryDetail>
        세트 설명:
        <CustomTextarea
          id="categoryDescription"
          value={description}
          onChange={(e) => handleBundleDescriptionChange(e)}
        />
      </CategoryDetail>
      <StyledButton type="button" onClick={createBundle} disabled={blockButton}>
        세트 생성
      </StyledButton>
      {showImageUpload ? (
        <div>
          세트 이미지:
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
          <StyledButton type="button" onClick={addBundleImages}>
            이미지 추가
          </StyledButton>
        </div>
      ) : null}
    </div>
  );
}
