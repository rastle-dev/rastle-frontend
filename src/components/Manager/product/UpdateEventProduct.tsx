import React from "react";
import styled from "styled-components";
import Input from "@/components/common/Input";

import Image from "next/image";
import useUpdateProduct from "@/hooks/manager/product/useUpdateProduct";

import COLORS from "@/constants/color";

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

export const StyledButton = styled.button`
  font-size: 1.18182rem;
  font-weight: 400;
  padding: 1rem;
  border: 1px solid ${COLORS.GREY.상세페이지};
  background-color: white;
  cursor: pointer;
  &:hover {
    font-weight: 500;
  }

  /* 버튼이 클릭된 상태일 때의 스타일 */
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

const ProductSubtitle = styled.div`
  font-size: 1.7rem;
  color: red;
  font-weight: 400;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 200px;
  height: 250px;
  font-size: 1rem;

  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
`;

const ApiButtonWrapper = styled.div`
  display: flex;
  margin-right: 2rem;
  margin-bottom: 3rem;
  margin-top: 2rem;
  font-size: 1rem;
`;
const RedSpan = styled.span`
  color: red;
  margin-left: 0.5rem;
`;
interface Bundle {
  id: number;
  name: string;
  imageUrls: string;
  description: string;
  saleStartTime: string;
  visible: boolean;
}

interface Category {
  id: number;
  name: string;
}

interface PRODUCT {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  event: boolean;
  mainThumbnail: string;
  subThumbnail: string;
  displayOrder: number;
  visible: boolean;
  bundleId: string;
  categoryId: string;
}

export default function UpdateEventProduct() {
  const {
    onChangeName,
    onChangePrice,
    onChangeDiscountPrice,
    bundleId,
    categoryId,
    handleBundleChange,
    handleBundleIdChange,
    handleCategoryChange,
    colors,
    sizes,
    showImageUpload,
    onChangeDisplayOrder,
    createProduct,
    bundleCategory,
    discountPercent,
    handleColorChange,
    discountedPrice,
    addColorInput,
    removeColorInput,
    removeSizeInput,
    handleSizeChange,
    addSizeInput,
    handleMainThumbnailChange,
    updateMainThumbnailImages,
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
    handleProductClick,
    handleVisibleChange,
    visible,
    name,
    price,
    discountPrice,
    displayOrder,
    selectedProduct,
    loadColorAndSize,
    productListData,
    bundleData,
    categoryData,
    mainImageData,
    loadImages,
    deleteProduct,
  } = useUpdateProduct();

  return (
    <div>
      <Title>상품 수정</Title>
      <ProductSubtitle>수정할 상품을 선택하세요</ProductSubtitle>
      <ProductList>
        {productListData?.data.content.map((product: PRODUCT) => (
          <ProductItem
            key={product.id}
            onClick={() => handleProductClick(product)}
          >
            <p>{product.name}</p>
            {product.mainThumbnail && (
              <Image
                src={product.mainThumbnail}
                alt="미리보기 이미지"
                width={160} // 이미지 너비
                height={200} // 이미지 높이
                style={{ margin: "5px" }}
              />
            )}
            {/* 상품 이름 */}
          </ProductItem>
        ))}
      </ProductList>
      <Input label="상품명" size={30} onChange={onChangeName} value={name} />
      <Input
        type="number"
        label="일반가격"
        size={30}
        value={price}
        onChange={onChangePrice}
      />
      <Input
        type="number"
        label="할인 가격"
        size={30}
        value={discountPrice}
        onChange={onChangeDiscountPrice}
      />
      <p>할인퍼센트 : {Number.isNaN(discountPercent) ? 0 : discountPercent}%</p>
      <p>할인된 가격 : {discountedPrice}</p>
      <Input
        type="number"
        label="출력순서"
        value={displayOrder}
        size={30}
        onChange={onChangeDisplayOrder}
      />
      <ProductDetail>
        공개:
        <EventCheckbox
          type="checkbox"
          checked={visible}
          onChange={(e) => handleVisibleChange(e)}
        />
      </ProductDetail>
      <ProductDetail>
        세트 추가 유무:
        <EventCheckbox
          type="checkbox"
          onChange={(e) => handleBundleChange(e)}
          checked={bundleCategory}
        />
      </ProductDetail>
      {bundleCategory && (
        <ProductDetail>
          세트 선택:
          <ProductCategory1Select
            id="category1"
            value={bundleId || ""}
            onChange={(e) => handleBundleIdChange(e)}
          >
            {bundleData?.data.content.map((bundle: Bundle) => (
              <option key={bundle.id} value={bundle.id}>
                {bundle.name}
              </option>
            ))}
          </ProductCategory1Select>
        </ProductDetail>
      )}
      <ProductDetail>
        카테고리 선택:
        <ProductCategory2Select
          id="category2"
          value={categoryId}
          onChange={(e) => handleCategoryChange(e)}
        >
          {categoryData?.data.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </ProductCategory2Select>
      </ProductDetail>
      <StyledButton onClick={loadColorAndSize}>
        색상, 사이즈 불러오기
      </StyledButton>
      <RedSpan>*필수 클릭</RedSpan>

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
      <ApiButtonWrapper>
        <StyledButton type="button" onClick={createProduct}>
          상품 수정
        </StyledButton>
        <StyledButton type="button" onClick={deleteProduct}>
          상품 삭제
        </StyledButton>
        <StyledButton type="button" onClick={loadImages}>
          이미지 불러오기
        </StyledButton>
      </ApiButtonWrapper>
      {showImageUpload && (
        <div>
          <ProductDetail>
            기존 메인 썸네일 이미지:
            <PreviewImages>
              {selectedProduct && (
                <Image
                  src={selectedProduct.mainThumbnail}
                  alt="미리보기 이미지"
                  width={200} // 이미지 너비
                  height={250} // 이미지 높이
                  style={{ margin: "5px" }}
                />
              )}
            </PreviewImages>
          </ProductDetail>
          <ProductDetail>
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
          </ProductDetail>
          <StyledButton type="button" onClick={updateMainThumbnailImages}>
            메인썸네일 변경하기
          </StyledButton>
          <ProductDetail>
            <br />
            기존 2번째 썸네일 이미지:
            <PreviewImages>
              {selectedProduct && (
                <Image
                  src={selectedProduct.subThumbnail}
                  alt="미리보기 이미지"
                  width={200} // 이미지 너비
                  height={250} // 이미지 높이
                  style={{ margin: "5px" }}
                />
              )}
            </PreviewImages>
          </ProductDetail>
          <ProductDetail>
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
          </ProductDetail>
          <StyledButton type="button" onClick={addSubThumbnailImages}>
            서브썸네일 변경하기
          </StyledButton>
          <ProductDetail>
            <br />
            기존 메인 이미지:
            <PreviewImages>
              {mainImageData?.data.mainImages.map((preview: string) => (
                <img
                  key={preview}
                  src={preview}
                  alt={`추가 이미지 미리보기 ${preview}`}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "250px",
                    margin: "5px",
                  }}
                />
              ))}
            </PreviewImages>
          </ProductDetail>
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
          <StyledButton type="button" onClick={addMainImages}>
            메인 사진들(10장)변경하기
          </StyledButton>
          <ProductDetail>
            <br />
            기존 상세페이지 이미지:
            <PreviewImages>
              {mainImageData?.data.detailImages.map((preview: string) => (
                <img
                  key={preview}
                  src={preview}
                  alt={`추가 이미지 미리보기 ${preview}`}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "250px",
                    margin: "5px",
                  }}
                />
              ))}
            </PreviewImages>
          </ProductDetail>
          <ProductDetail>
            <br />
            상세페이지 이미지 추가:
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
          <StyledButton type="button" onClick={addDetailImages}>
            디테일 사진들 변경하기
          </StyledButton>
          <br />
        </div>
      )}
    </div>
  );
}
