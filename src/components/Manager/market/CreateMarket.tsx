import React, { useState } from "react";
import styled from "styled-components";
import useCreateMarket from "@/hooks/manager/market/useCreateMarket";
import Input from "@/components/common/Input";

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

export default function CreateMarket() {
  const {
    description,
    previewImages,
    handleCategoryDescriptionChange,
    handleImageUpload,
    onChangeName,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStartHour,
    onChangeStartMinute,
    onChangeStartSecond,
    createMarket,
    showImageUpload,
    addMarketImages,
  } = useCreateMarket();

  return (
    <div>
      <Title>마켓 추가</Title>
      <CategoryDetail>
        <Input label="마켓이름" size={30} onChange={onChangeName} />
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
          label="종료 날짜"
          placeholder="마켓 일단 무제한으로 걸어놓기(2024-09-01)"
          size={30}
          onChange={onChangeEndDate}
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
        <label htmlFor="categoryDescription">카테고리 설명:</label>
        <CustomTextarea
          id="categoryDescription"
          value={description}
          onChange={(e) => handleCategoryDescriptionChange(e)}
        />
      </CategoryDetail>
      <button onClick={createMarket}>마켓 생성</button>
      {showImageUpload ? (
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="categoryImage">카테고리 이미지:</label>
          <input
            type="file"
            id="categoryImage"
            accept="image/*"
            multiple // 여러 이미지 업로드 가능하도록
            onChange={handleImageUpload}
          />
          <PreviewImages>
            {previewImages.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`미리보기 이미지 ${index}`}
                style={{ maxWidth: "200px", maxHeight: "250px", margin: "5px" }}
              />
            ))}
          </PreviewImages>
          <button onClick={addMarketImages}>이미지 추가</button>
        </div>
      ) : null}
    </div>
  );
}
