import React, { useState } from "react";
import styled from "styled-components";

const Title = styled.div`
  margin: 0;
  font-size: 2.2rem;
  padding-bottom: 2rem;
`;

const ProductDetail = styled.div`
  margin: 0;
  padding-bottom: 1rem;

  label {
    margin-right: 0.5rem;
  }
`;

const ProductNameInput = styled.input`
  width: 30%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ProductCategory1Select = styled.select`
  width: 30%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ProductCategory2Select = styled.select`
  width: 30%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const EventCheckbox = styled.input`
  margin-right: 0.5rem;
`;

const ProductPriceInput = styled.input`
  width: 30%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const DiscountPercentInput = styled.input`
  width: 30%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ColorInputs = styled.div`
  margin-top: 1rem;
`;

const ColorInput = styled.input`
  width: 30%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const SizeInputs = styled.div`
  margin-top: 1rem;
`;

const SizeInput = styled.input`
  width: 30%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const ThumbnailInput = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const SecondImageInput = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const AdditionalImagesInput = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const PreviewImages = styled.div`
  margin-top: 1rem;
`;

export default function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [hasEvent, setHasEvent] = useState(false);
  const [productPrice, setProductPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [colors, setColors] = useState<string[]>([""]);
  const [sizes, setSizes] = useState<string[]>([""]);
  const [thumbnail, setThumbnail] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleCategory1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory1(e.target.value);
  };

  const handleCategory2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory2(e.target.value);
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasEvent(e.target.checked);
  };

  const handleProductPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductPrice(e.target.value);
  };

  const handleDiscountPercentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDiscountPercent(e.target.value);
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newColors = [...colors];
    newColors[index] = e.target.value;
    setColors(newColors);
  };

  const addColorInput = () => {
    setColors([...colors, ""]);
  };

  const handleSizeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newSizes = [...sizes];
    newSizes[index] = e.target.value;
    setSizes(newSizes);
  };

  const addSizeInput = () => {
    setSizes([...sizes, ""]);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSecondImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setSecondImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: string[] = [...additionalImages];

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(reader.result as string);
            setAdditionalImages(newImages);
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 여기에서 상품 생성 및 제출 로직을 구현하면 됩니다.
    // 상품 정보 및 이미지 등을 서버로 데이터를 전송하거나 상태를 업데이트하세요.
  };

  return (
    <div>
      <Title>새로운 상품 추가</Title>
      <ProductDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="productName">상품명:</label>
        <ProductNameInput
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => handleProductNameChange(e)}
        />
      </ProductDetail>
      <ProductDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="productPrice">일반 가격:</label>
        <ProductPriceInput
          type="number"
          id="productPrice"
          value={productPrice}
          onChange={(e) => handleProductPriceChange(e)}
        />
      </ProductDetail>
      <ProductDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="discountPercent">할인 퍼센트:</label>
        <DiscountPercentInput
          type="number"
          id="discountPercent"
          value={discountPercent}
          onChange={(e) => handleDiscountPercentChange(e)}
        />
      </ProductDetail>
      <ProductDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>이벤트 유무:</label>
        <EventCheckbox
          type="checkbox"
          checked={hasEvent}
          onChange={(e) => handleEventChange(e)}
        />
      </ProductDetail>
      <ProductDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="category1">카테고리 1 선택:</label>
        <ProductCategory1Select
          id="category1"
          value={category1}
          onChange={(e) => handleCategory1Change(e)}
        >
          <option value="category1-option1">카테고리 1 옵션 1</option>
          <option value="category1-option2">카테고리 1 옵션 2</option>
        </ProductCategory1Select>
      </ProductDetail>
      <ProductDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="category2">카테고리 2 선택:</label>
        <ProductCategory2Select
          id="category2"
          value={category2}
          onChange={(e) => handleCategory2Change(e)}
        >
          <option value="category2-option1">카테고리 2 옵션 1</option>
          <option value="category2-option2">카테고리 2 옵션 2</option>
        </ProductCategory2Select>
      </ProductDetail>
      <ColorInputs>
        {colors.map((color, index) => (
          <ProductDetail>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>색상 추가:</label>
            <ColorInput
              type="text"
              value={color}
              onChange={(e) => handleColorChange(e, index)}
            />
          </ProductDetail>
        ))}
        <button type="button" onClick={addColorInput}>
          색상 추가
        </button>
      </ColorInputs>
      <SizeInputs>
        {sizes.map((size, index) => (
          <ProductDetail>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>사이즈 추가:</label>
            <SizeInput
              type="text"
              value={size}
              onChange={(e) => handleSizeChange(e, index)}
            />
          </ProductDetail>
        ))}
        <button type="button" onClick={addSizeInput}>
          사이즈 추가
        </button>
      </SizeInputs>
      <ProductDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>썸네일 지정:</label>
        <ThumbnailInput
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
        />
        {thumbnail && (
          <img
            src={thumbnail}
            alt="썸네일 이미지 미리보기"
            style={{ maxWidth: "200px", maxHeight: "250px", margin: "5px" }}
          />
        )}
      </ProductDetail>
      <ProductDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>2번째 사진 지정:</label>
        <SecondImageInput
          type="file"
          accept="image/*"
          onChange={handleSecondImageChange}
        />
        {secondImage && (
          <img
            src={secondImage}
            alt="2번째 이미지 미리보기"
            style={{ maxWidth: "200px", maxHeight: "250px", margin: "5px" }}
          />
        )}
      </ProductDetail>
      <ProductDetail>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>이미지 추가:</label>
        <AdditionalImagesInput
          type="file"
          accept="image/*"
          multiple // 여러 이미지 업로드 가능하도록
          onChange={handleAdditionalImagesChange}
        />
        <PreviewImages>
          {additionalImages.map((preview, index) => (
            <img
              src={preview}
              alt={`추가 이미지 미리보기 ${index}`}
              style={{ maxWidth: "200px", maxHeight: "250px", margin: "5px" }}
            />
          ))}
        </PreviewImages>
      </ProductDetail>
      <button type="button" onClick={handleSubmit}>
        상품 생성
      </button>
    </div>
  );
}
