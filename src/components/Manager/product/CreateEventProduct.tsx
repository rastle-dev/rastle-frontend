import React from "react";
import styled from "styled-components";
import Input from "@/components/common/Input";
import { adminGetEvent } from "@/api/admin";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import Image from "next/image";
import COLORS from "@/constants/color";
import useCreateEventProduct from "@/hooks/manager/product/useCreateEventProduct";

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

const ProductImgDetail = styled.div`
  margin: 0;
  padding-bottom: 0.3rem;

  label {
    margin-right: 0.5rem;
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

const ColorInputs = styled.div`
  margin-top: 1rem;
`;

const ColorInput = styled.input`
  width: 10rem;
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
  width: 10rem;
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

export const StyledButton = styled.button`
  margin-top: 1rem;
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

export const StyledImgButton = styled.button`
  font-size: 1.18182rem;
  font-weight: 400;
  padding: 1rem;
  border: 0.5px solid ${COLORS.GREY.상세페이지};
  background-color: white;
  cursor: pointer;
  margin-bottom: 1rem;
  &:hover {
    font-weight: 500;
  }

  /* 버튼이 클릭된 상태일 때의 스타일 */
`;

interface Event {
  id: number;
  name: string;
  imageUrls: string;
  description: string;
  saleStartTime: string;
  visible: boolean;
}

export default function CreateEventProduct() {
  const {
    onChangeName,
    onChangePrice,
    onChangeDiscountPrice,
    eventId,
    handleBundleIdChange,
    colors,
    sizes,
    showImageUpload,
    onChangeDisplayOrder,
    createProduct,
    discountPercent,
    handleColorChange,
    discountedPrice,
    addColorInput,
    removeColorInput,
    removeSizeInput,
    handleSizeChange,
    addSizeInput,
    handleMainThumbnailChange,
    addMainThumbnailImages,
    handleSubThumbnailChange,
    addSubThumbnailImages,
    handleMainImagesChange,
    addMainImages,
    handleDetailImagesChange,
    addDetailImages,
    mainThumbnail,
    subThumbnail,
    mainImages,
    detailImages,
    blockMainThumbnailButton,
    blockSubThumbnailButton,
    blockMainImagesButton,
    blockDetailImagesButton,
    blockCreateProductButton,
  } = useCreateEventProduct();

  const { data: eventData } = useQuery(
    [QUERYKEYS.ADMIN_GET_EVENT],
    adminGetEvent,
  );

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
        label="할인 가격"
        size={30}
        onChange={onChangeDiscountPrice}
      />
      <p>할인퍼센트 : {Number.isNaN(discountPercent) ? 0 : discountPercent}%</p>
      <p>할인된 가격 : {discountedPrice}</p>
      <Input
        type="number"
        label="출력순서"
        size={30}
        placeholder="낮은 순서일수록 앞에 나타남"
        onChange={onChangeDisplayOrder}
      />
      <ProductDetail>
        이벤트 선택:
        <ProductCategory1Select
          id="category1"
          value={eventId}
          onChange={(e) => handleBundleIdChange(e)}
        >
          {eventData?.data.content.map((event: Event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </ProductCategory1Select>
      </ProductDetail>
      색상 추가
      <ColorInputs>
        {colors.map((color, index) => (
          <div>
            <ColorInput
              type="text"
              value={color}
              onChange={(e) => handleColorChange(e, index)}
            />
            <button type="button" onClick={() => removeColorInput(index)}>
              삭제
            </button>
          </div>
        ))}
      </ColorInputs>
      <button type="button" onClick={addColorInput}>
        색상 추가
      </button>
      <SizeInputs>
        {sizes.map((size, index) => (
          <div>
            <SizeInput
              type="text"
              value={size}
              onChange={(e) => handleSizeChange(e, index)}
            />
            <button type="button" onClick={() => removeSizeInput(index)}>
              삭제
            </button>
          </div>
        ))}
        <button type="button" onClick={addSizeInput}>
          사이즈 추가
        </button>
      </SizeInputs>
      <StyledButton
        type="button"
        onClick={createProduct}
        disabled={blockCreateProductButton}
      >
        이벤트 상품 생성
      </StyledButton>
      {showImageUpload ? (
        <div>
          <ProductImgDetail>
            썸네일 지정:
            <ThumbnailInput
              type="file"
              accept="image/*"
              onChange={handleMainThumbnailChange}
            />
            <PreviewImages>
              {mainThumbnail && (
                <Image
                  src={mainThumbnail}
                  alt="미리보기 이미지"
                  width={200} // 이미지 너비
                  height={250} // 이미지 높이
                  style={{ margin: "5px" }}
                />
              )}
            </PreviewImages>
          </ProductImgDetail>
          <StyledImgButton
            onClick={addMainThumbnailImages}
            disabled={blockMainThumbnailButton}
          >
            메인썸네일 추가하기
          </StyledImgButton>
          <ProductImgDetail>
            2번째 사진 지정:
            <SecondImageInput
              type="file"
              accept="image/*"
              onChange={handleSubThumbnailChange}
            />
            <PreviewImages>
              {subThumbnail && (
                <Image
                  src={subThumbnail}
                  alt="서브썸네일 이미지"
                  width={200} // 이미지 너비
                  height={250} // 이미지 높이
                  style={{ margin: "5px" }}
                />
              )}
            </PreviewImages>
          </ProductImgDetail>
          <StyledImgButton
            onClick={addSubThumbnailImages}
            disabled={blockSubThumbnailButton}
          >
            서브썸네일 추가하기
          </StyledImgButton>
          <ProductDetail>
            메인 이미지 추가:
            <AdditionalImagesInput
              type="file"
              accept="image/*"
              multiple // 여러 이미지 업로드 가능하도록
              onChange={handleMainImagesChange}
            />
            <PreviewImages>
              {mainImages.map((preview, index) => (
                <img
                  key={preview}
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
          <StyledImgButton
            onClick={addMainImages}
            disabled={blockMainImagesButton}
          >
            메인 사진들(10장)추가하기
          </StyledImgButton>
          <ProductDetail>
            디테일 이미지 추가:
            <AdditionalImagesInput
              type="file"
              accept="image/*"
              multiple // 여러 이미지 업로드 가능하도록
              onChange={handleDetailImagesChange}
            />
            <PreviewImages>
              {detailImages.map((preview, index) => (
                <img
                  key={preview}
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
          <StyledImgButton
            onClick={addDetailImages}
            disabled={blockDetailImagesButton}
          >
            디테일 사진들 추가하기
          </StyledImgButton>
          <br />
        </div>
      ) : null}
    </div>
  );
}
