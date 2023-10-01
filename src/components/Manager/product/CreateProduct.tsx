import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "@/components/common/Input";
import useCreateProduct from "@/hooks/manager/product/useCreateProduct";
import {
  adminAddDetailImage,
  adminAddMainImage,
  adminAddMainThumbnailImage,
  adminAddSubThumbnailImage,
  adminGetCategory,
  adminGetBundle,
} from "@/api/admin";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";

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

const DiscountCheckbox = styled.input`
  margin-right: 0.5rem;
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
  const {
    onChangeName,
    onChangePrice,
    onChangeDiscount,
    eventCategory,
    marketId,
    categoryId,
    handleEventChange,
    handleMarketChange,
    handleCategoryChange,
    colors,
    setColors,
    sizes,
    setSizes,
    showImageUpload,
    onChangeDisplayOrder,
    createProduct,
    productId,
  } = useCreateProduct();

  const [mainThumbnail, setMainThumbnail] = useState("");
  const [mainThumbnailFile, setMainThumbnailFile] = useState<File[]>([]);
  const [subThumbnail, setSubThumbnail] = useState("");
  const [subThumbnailFile, setSubThumbnailFile] = useState<File[]>([]);
  const [mainImages, setMainImages] = useState<string[]>([]);
  const [mainImageFiles, setMainImageFiles] = useState<File[]>([]);
  const [detailImages, setDetailImages] = useState<string[]>([]);
  const [detailImageFiles, setDetailImageFiles] = useState<File[]>([]);

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

  const handleMainThumbnailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...mainThumbnailFile];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(file);

            setMainThumbnailFile(newImages.slice(0, 1)); // 최대 3개까지만 유지
            setMainThumbnail(reader.result as string);
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };

  const addMainThumbnailImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < mainThumbnailFile.length; i++) {
      formData.append("mainThumbnail", mainThumbnailFile[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminAddMainThumbnailImage(productId, formData);

      // 서버 응답 처리
      console.log(data);
    } catch (error) {
      // 오류 처리
      console.error("이미지 업로드 오류:", error);
    }
  };

  const handleSubThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...subThumbnailFile];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(file);

            setSubThumbnailFile(newImages.slice(0, 1)); // 최대 3개까지만 유지
            setSubThumbnail(reader.result as string);
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };

  const addSubThumbnailImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < subThumbnailFile.length; i++) {
      formData.append("subThumbnail", subThumbnailFile[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminAddSubThumbnailImage(productId, formData);

      // 서버 응답 처리
      console.log(data);
    } catch (error) {
      // 오류 처리
      console.error("이미지 업로드 오류:", error);
    }
  };

  const handleMainImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...mainImageFiles];
      const newPreviews: string[] = [...mainImages];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(file);
            newPreviews.push(reader.result as string);

            setMainImageFiles(newImages.slice(0, 10)); // 최대 3개까지만 유지
            setMainImages(newPreviews.slice(0, 10));
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };
  const addMainImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < mainImageFiles.length; i++) {
      formData.append("mainImages", mainImageFiles[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminAddMainImage(productId, formData);

      // 서버 응답 처리
      console.log(data);
    } catch (error) {
      // 오류 처리
      console.error("이미지 업로드 오류:", error);
    }
  };

  const handleDetailImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...detailImageFiles];
      const newPreviews: string[] = [...detailImages];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(file);
            newPreviews.push(reader.result as string);

            setDetailImageFiles(newImages); // 최대 3개까지만 유지
            setDetailImages(newPreviews);
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };

  const addDetailImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < detailImageFiles.length; i++) {
      formData.append("detailImages", detailImageFiles[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminAddDetailImage(productId, formData);

      // 서버 응답 처리
      console.log(data);
    } catch (error) {
      // 오류 처리
      console.error("이미지 업로드 오류:", error);
    }
  };

  console.log(sizes);
  console.log(colors);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 여기에서 상품 생성 및 제출 로직을 구현하면 됩니다.
    // 상품 정보 및 이미지 등을 서버로 데이터를 전송하거나 상태를 업데이트하세요.
  };

  console.log(eventCategory);

  const { data: bundleData } = useQuery(
    [QUERYKEYS.ADMIN_GET_SET],
    adminGetBundle,
  );

  const { data: categoryData } = useQuery(
    [QUERYKEYS.ADMIN_GET_CATEGORY],
    adminGetCategory,
  );

  console.log(bundleData);
  console.log(categoryData);
  return (
    <div>
      <Title>새로운 상품 추가</Title>
      <Input label="상품명" size={30} onChange={onChangeName} />
      <Input
        type="number"
        label="일반가격"
        size={30}
        onChange={onChangePrice}
      />
      <Input
        type="number"
        label="할인퍼센트"
        size={30}
        onChange={onChangeDiscount}
      />
      <Input
        type="number"
        label="출력순서"
        size={30}
        onChange={onChangeDisplayOrder}
      />
      <ProductDetail>
        <label>이벤트 유무:</label>
        <EventCheckbox type="checkbox" onChange={(e) => handleEventChange(e)} />
      </ProductDetail>
      트
      <ProductDetail>
        <label htmlFor="category1">마켓 선택:</label>
        <ProductCategory1Select
          id="category1"
          value={marketId}
          onChange={(e) => handleMarketChange(e)}
        >
          {bundleData?.data.content.map((market) => (
            <option key={market.id} value={market.id}>
              {market.name}
            </option>
          ))}
        </ProductCategory1Select>
      </ProductDetail>
      <ProductDetail>
        <label htmlFor="category2">카테고리 선택:</label>
        <ProductCategory2Select
          id="category2"
          value={categoryId}
          onChange={(e) => handleCategoryChange(e)}
        >
          {categoryData?.data.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </ProductCategory2Select>
      </ProductDetail>
      <ColorInputs>
        {colors.map((color, index) => (
          <ProductDetail key={index}>
            <label>색상 추가:</label>
            <ColorInput
              type="text"
              value={color}
              onChange={(e) => handleColorChange(e, index)}
            />
          </ProductDetail>
        ))}
        <button onClick={addColorInput}>색상 추가</button>
      </ColorInputs>
      <SizeInputs>
        {sizes.map((size, index) => (
          <ProductDetail key={index}>
            <label>사이즈 추가:</label>
            <SizeInput
              type="text"
              value={size}
              onChange={(e) => handleSizeChange(e, index)}
            />
          </ProductDetail>
        ))}
        <button onClick={addSizeInput}>사이즈 추가</button>
      </SizeInputs>
      <button onClick={createProduct}>상품 생성</button>
      {showImageUpload ? (
        <div>
          <ProductDetail>
            <label>썸네일 지정:</label>
            <ThumbnailInput
              type="file"
              accept="image/*"
              onChange={handleMainThumbnailChange}
            />
            {mainThumbnail && (
              <img
                src={mainThumbnail}
                alt="썸네일 이미지 미리보기"
                style={{ maxWidth: "200px", maxHeight: "250px", margin: "5px" }}
              />
            )}
          </ProductDetail>
          <button onClick={addMainThumbnailImages}>메인썸네일 추가하기</button>
          <ProductDetail>
            <label>2번째 사진 지정:</label>
            <SecondImageInput
              type="file"
              accept="image/*"
              onChange={handleSubThumbnailChange}
            />
            {subThumbnail && (
              <img
                src={subThumbnail}
                alt="2번째 이미지 미리보기"
                style={{ maxWidth: "200px", maxHeight: "250px", margin: "5px" }}
              />
            )}
          </ProductDetail>
          <button onClick={addSubThumbnailImages}>서브썸네일 추가하기</button>
          <ProductDetail>
            <label>메인 이미지 추가:</label>
            <AdditionalImagesInput
              type="file"
              accept="image/*"
              multiple // 여러 이미지 업로드 가능하도록
              onChange={handleMainImagesChange}
            />
            <PreviewImages>
              {mainImages.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`추가 이미지 미리보기 ${index}`}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "250px",
                    margin: "5px",
                  }}
                />
              ))}
            </PreviewImages>
          </ProductDetail>
          <button onClick={addMainImages}>메인 사진들(10장)추가하기</button>
          <ProductDetail>
            <label>디테일 이미지 추가:</label>
            <AdditionalImagesInput
              type="file"
              accept="image/*"
              multiple // 여러 이미지 업로드 가능하도록
              onChange={handleDetailImagesChange}
            />
            <PreviewImages>
              {detailImages.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`추가 이미지 미리보기 ${index}`}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "250px",
                    margin: "5px",
                  }}
                />
              ))}
            </PreviewImages>
          </ProductDetail>
          <button onClick={addDetailImages}>디테일 사진들 추가하기</button>
          <br />
          <button onClick={handleSubmit}>상품 생성</button>
        </div>
      ) : null}
    </div>
  );
}
