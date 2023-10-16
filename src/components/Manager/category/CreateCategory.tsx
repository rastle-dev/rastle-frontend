import React, { useState } from "react";
import styled from "styled-components";

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

export default function CreateCategory() {
  const [categoryType, setCategoryType] = useState("clothing");
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImages, setCategoryImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleCategoryTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategoryType(e.target.value);
  };

  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleCategoryDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCategoryDescription(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...categoryImages];
      const newPreviews: string[] = [...previewImages];

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(file);
            newPreviews.push(reader.result as string);

            setCategoryImages(newImages.slice(0, 3)); // 최대 3개까지만 유지
            setPreviewImages(newPreviews.slice(0, 3));
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 여기에서 카테고리 생성 및 제출 로직을 구현하면 됩니다.
    // categoryType, categoryName, displayOrder, categoryDescription,
    // categoryImages를 이용하여 서버로 데이터를 전송하거나 상태를 업데이트하세요.
  };

  return (
    <div>
      <Title>카테고리 추가</Title>
      <CategoryDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="categoryType">카테고리 분류:</label>
        <select
          id="categoryType"
          value={categoryType}
          onChange={handleCategoryTypeChange}
        >
          <option value="clothing">의류 카테고리</option>
          <option value="market">마켓 카테고리</option>
        </select>
      </CategoryDetail>
      <CategoryDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="categoryName">카테고리 이름:</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => handleCategoryNameChange(e)}
        />
      </CategoryDetail>
      <CategoryDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="categoryDescription">카테고리 설명:</label>
        <CustomTextarea
          id="categoryDescription"
          value={categoryDescription}
          onChange={(e) => handleCategoryDescriptionChange(e)}
        />
      </CategoryDetail>
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
              src={preview}
              alt={`미리보기 이미지 ${index}`}
              style={{ maxWidth: "200px", maxHeight: "250px", margin: "5px" }}
            />
          ))}
        </PreviewImages>
      </div>
      <button type="button" onClick={handleSubmit}>
        카테고리 생성
      </button>
    </div>
  );
}
