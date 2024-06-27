import React from "react";
import styled from "styled-components";
import Input from "@/components/Common/Input";
import useCreateProduct from "@/hooks/manager/product/useCreateProduct";
import COLORS from "@/constants/color";
import { PRODUCT } from "@/interface/manager/product";
import { Bundle } from "@/interface/manager/bundle";
import Category from "@/interface/category";

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
  height: 280px;
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
`;

export default function CreateProduct() {
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
    handleDisplayOrderChange,
    displayOrderCheck,
    blockMainThumbnailButton,
    blockSubThumbnailButton,
    blockMainImagesButton,
    blockDetailImagesButton,
    blockCreateProductButton,
    productListData,
    categoryData,
    bundleData,
  } = useCreateProduct();

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
        상품 출력순서 확인하기
        <EventCheckbox
          type="checkbox"
          checked={displayOrderCheck}
          onChange={(e) => handleDisplayOrderChange(e)}
        />
      </ProductDetail>
      {displayOrderCheck && (
        <ProductList>
          {productListData?.data.content.map((product: PRODUCT) => (
            <ProductItem key={product.id}>
              <p>{product.name}</p>
              {product.displayOrder}
              {
                <img
                  src={product.mainThumbnail}
                  alt="미리보기 이미지"
                  width={160} // 이미지 너비
                  height={200} // 이미지 높이
                  style={{ margin: "5px" }}
                />
              }
              {/* 상품 이름 */}
            </ProductItem>
          ))}
        </ProductList>
      )}
      <ProductDetail>
        세트 추가 유무:
        <EventCheckbox
          type="checkbox"
          onChange={(e) => handleBundleChange(e)}
        />
      </ProductDetail>
      {bundleCategory && (
        <ProductDetail>
          세트 선택:
          <ProductCategory1Select
            id="category1"
            value={bundleId}
            onChange={(e) => handleBundleIdChange(e)}
          >
            <option value="">원하는 세트를 선택하세요.</option>
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
          <option value="">원하는 카테고리를 선택하세요.</option>
          {categoryData?.data.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </ProductCategory2Select>
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
        상품 생성
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
                <img
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
                <img
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
